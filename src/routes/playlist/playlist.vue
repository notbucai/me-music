<template>
  <div id="playlist">
    <header class="app-header">
      <h1 class="music_title">恋爱循环</h1>
      <MusicPlayer
        v-bind:cAngle="cAngle"
        v-bind:musicTimeShow="musicTimeShow"
        v-on:changeAngle="handleUpdateCurrentLen"
        v-on:play="handleAudioPlay"
        v-on:pause="handleAudioPause"
        v-bind:oldStart="oldStart"
      />
      <PlayAction v-on:play="handlePlay" v-bind:cStatus="cStatus"/>
    </header>
    <main class="app-main">
      <CommentList/>
    </main>

    <audio
      src="https://bucai-blog.oss-cn-beijing.aliyuncs.com/1.mp3"
      controls="controls"
      :ref="audio_ref"
      preload="auto"
      v-on:play="handlePlayEvent"
      v-on:pause="handlePauseEvent"
      v-on:durationchange="handleMusicLoad"
    ></audio>
  </div>
</template>

<script>
import domUtil from "~/util/domUtil";
import CommentList from "./components/commentList.vue";
import MusicPlayer from "./components/musicPlayer.vue";
import PlayAction from "./components/playAction.vue";
export default {
  name: "PlayList",
  mounted() {
    document.body.addEventListener("touchstart", () => {});
    this.handleAudioPlay("audio");
    this.handleAudioPause("audio");
  },
  components: {
    CommentList,
    PlayAction,
    MusicPlayer
  },
  data() {
    return {
      tLen: 423,
      cLen: 0,
      cAngle: 0,
      c_timer: null,
      update_timer: null,
      cStatus: false,
      oldStart: false,
      audio_ref: "audio"
    };
  },

  computed: {
    musicTimeShow() {
      const { cLen, tLen } = this;
      return (
        Math.floor(cLen / 60) +
        ":" +
        String(Math.floor(cLen % 60)).padStart(2, 0) +
        "/" +
        Math.floor(tLen / 60) +
        ":" +
        String(Math.floor(tLen % 60)).padStart(2, 0)
      );
    }
  },
  watch: {
    cLen: function() {
      // 监听当前已播放的长度
      this.cAngle = (360 / this.tLen) * this.cLen;
    }
  },
  methods: {
    /**
     * 播放or暂停
     * ref 播放器的ref字符串
     */
    handlePlay() {
      //  是否暂停 暂停就播放
      if (!this.cStatus) {
        this.handleAudioPlay();
      } else {
        this.handleAudioPause();
      }
    },

    handleAudioPlay() {
      const el = this.$refs[this.audio_ref];

      // 指定前的状态 handleAudioPause 同样
      this.oldStart = el.paused;

      el.play();
    },

    handleAudioPause() {
      const el = this.$refs[this.audio_ref];
      this.oldStart = el.paused;

      el.pause();
    },

    handleMusicLoad(event) {
      this.tLen = event.target.duration;
    },

    handlePlayEvent(event) {
      this.tLen = event.target.duration;
      this.cStatus = true;

      this.handleRenderPalyer(event.target);
    },
    handlePauseEvent(event) {
      this.cStatus = false;
    },
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
      clearTimeout(this.update_timer);

      // 加入防抖机制
      this.update_timer = setTimeout(() => {
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
    }
  }
};
</script>

<style lang="scss" scoped>
audio {
  position: absolute;
  bottom: 0;
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
