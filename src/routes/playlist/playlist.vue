<template>
  <div id="playlist">
    <header class="app-header">
      <h1 class="music_title">{{currentMusic.title}} - [{{currentMusic.author}}]</h1>
      <MusicPlayer
        v-bind:cAngle="cAngle"
        v-bind:musicTimeShow="musicTimeShow"
        v-bind:currentMusic="currentMusic"
        v-on:changeAngle="handleUpdateCurrentLen"
        v-on:play="handleAudioPlay"
        v-on:pause="handleAudioPause"
        v-bind:oldStart="oldStart"
      />
      <PlayAction
        v-on:play="handlePlay"
        v-bind:cStatus="cStatus"
        v-on:showlist="handleShowList"
        v-on:next="handleNextMusic"
        v-on:last="handleLastMusic"
      />
    </header>
    <main class="app-main">
      <CommentList :hotComments="hotComments" />
    </main>

    <audio
      v-bind:src="currentMusic.url"
      controls="controls"
      :ref="audio_ref"
      v-on:play="handlePlayEvent"
      v-on:pause="handlePauseEvent"
      v-on:ended="handleEndedEvent"
      v-on:durationchange="handleMusicLoad"
    ></audio>

    <MusicList
      v-if="showList"
      v-on:showlist="handleShowList"
      v-bind:musicList="musicList"
      v-bind:currentMusic="currentMusic.id"
      v-on:switchMusic="handleSwitchMusic"
    />
  </div>
</template>

<script>
import domUtil from '~/util/domUtil';
import CommentList from './components/commentList.vue';
import MusicPlayer from './components/musicPlayer.vue';
import PlayAction from './components/playAction.vue';
import MusicList from './components/musicList.vue';

export default {
  name: 'PlayList',
  mounted() {
    document.body.addEventListener('touchstart', () => {});
    this.$nextTick(() => {
      setTimeout(() => {
        this.handleAudioPlay('audio');
        this.handleAudioPause('audio');
      }, 0);
    });
  },
  async created() {
    const id = this.$route.params.id;

    try {
      const [res] = await this.$get('playlist?id=' + id);

      this.musicList = res.data.Body || [];
      this.currentMusic = this.musicList[0];
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    CommentList,
    PlayAction,
    MusicPlayer,
    MusicList
  },
  data() {
    return {
      // 总时长
      tLen: 423,
      // 当前播放时间
      cLen: 0,
      // 当前角度
      cAngle: 0,
      // 当前播放的状态
      cStatus: false,
      // 之前的状态
      oldStart: false,
      // 音乐标签的dom-name
      audio_ref: 'audio',
      // 是否展开播放列表
      showList: false,
      // 当前播放的音频的数据
      currentMusic: {},
      // 播放列表
      musicList: [],
      // 热评列表
      hotComments: []
    };
  },

  computed: {
    musicTimeShow() {
      const { cLen, tLen } = this;
      return (
        Math.floor(cLen / 60) +
        ':' +
        String(Math.floor(cLen % 60)).padStart(2, 0) +
        '/' +
        Math.floor(tLen / 60) +
        ':' +
        String(Math.floor(tLen % 60)).padStart(2, 0)
      );
    }
  },
  watch: {
    cLen: function() {
      // 监听当前已播放的长度
      this.cAngle = (360 / this.tLen) * this.cLen;
    },
    // 监听音频对象的改变
    async currentMusic() {
      setTimeout(() => {
        this.handleAudioPlay();
      }, 0);
      const [res] = await this.$get('hotComments?id=' + this.currentMusic.id);
      const { data } = res;
      this.hotComments = data.hotComments || [];
    }
  },
  methods: {
    /**
     * 播放or暂停
     * ref 播放器的ref字符串
     */
    handlePlay() {
      //  是否暂停 暂停就继续播放
      if (!this.cStatus) {
        this.handleAudioPlay();
      } else {
        this.handleAudioPause();
      }
    },
    // 播放
    handleAudioPlay() {
      const el = this.$refs[this.audio_ref];
      // 指定前的状态 handleAudioPause 同样
      this.oldStart = el.paused;
      el.play();
    },
    // 音频继续播放
    handleAudioPause() {
      const el = this.$refs[this.audio_ref];
      this.oldStart = el.paused;
      el.pause();
    },
    // 当音乐加载成功触发
    handleMusicLoad(event) {
      this.tLen = event.target.duration;
    },
    // 切换列表显示
    handleShowList() {
      this.showList = !this.showList;
    },
    // 当开始播放事件触发后执行这个回调函数
    handlePlayEvent(event) {
      this.tLen = event.target.duration;
      this.cStatus = true;
      // 然后执行传入音频对象
      this.handleRenderPalyer(event.target);
    },
    // 当暂停后事件
    handlePauseEvent(event) {
      this.cStatus = false;
    },
    // 当结束后事件
    handleEndedEvent() {
      // 播放下一首
      this.handleNextMusic();
    },
    // 递归获取当前播放时间
    // 用于实时更新当前播放时长
    // target 是一个
    handleRenderPalyer(target) {
      // 获取当前已播放的长度
      this.cLen = target.currentTime;
      // 未暂停，就循环更新
      if (!target.paused) {
        // 刷新
        window.requestAnimationFrame(() => {
          this.handleRenderPalyer(target);
        });
      }
    },

    // 更新 角度
    handleUpdateCurrentLen(angle) {
      clearTimeout(this.handleUpdateCurrentLen.update_timer);

      // 加入防抖机制
      this.handleUpdateCurrentLen.update_timer = setTimeout(() => {
        // 防止直接从开头拖动到结尾或者 直接结尾到开头 提升体验
        if (this.cAngle <= 90 && angle > 180) {
          // this.cAngle = 0;
          this.cLen = 0;
        } else if (this.cAngle >= 270 && angle < 180) {
          this.cLen = this.tLen;
        } else {
          this.cLen = angle * (this.tLen / 360);
        }
        // 更新音乐进度
        const el = this.$refs[this.audio_ref];
        el.currentTime = this.cLen;
      }, 10);
    },
    // 点击切换英语
    handleSwitchMusic(music_id) {
      this.handleAudioPause();

      setTimeout(() => {
        const current = this.musicList.find(item => item.id == music_id);
        if (current) {
          this.currentMusic = current;
        }
      }, 0);
    },
    // 切换下一首
    handleNextMusic() {
      this.handleAudioPause();
      const music_id = this.currentMusic.id;

      let index = this.musicList.findIndex(item => item.id == music_id) + 1;
      if (index >= this.musicList.length) {
        index = 0;
      }
      this.currentMusic = this.musicList[index];
    },
    // 切换上一首
    handleLastMusic() {
      const music_id = this.currentMusic.id;
      this.handleAudioPause();
      let index = this.musicList.findIndex(item => item.id == music_id) - 1;
      if (index < 0) {
        index = this.musicList.length - 1;
      }
      this.currentMusic = this.musicList[index];
    }
  }
};
</script>

<style lang="scss" scoped>
audio {
  position: absolute;
  bottom: 0;
  display: none; // 完全不占用
  /* visibility: hidden;  隐藏但占用文档*/
}
.app-header {
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 40px;
  background-color: #fba5ea;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 120%);
}
.music_title {
  background: #a18cd157;
  padding: 26px;
  text-align: center;
  /* margin-top: 40px; */
  color: #a18cd1;
  font-size: 28px;
  letter-spacing: 4px;
  text-shadow: 0 0 12px #ccaef7;
}

.app-main {
  position: relative;
  width: 100%;
  /* border-top: 1px solid #bca3f5; */
  margin-top: 40px;
  box-sizing: border-box;
}
</style>
