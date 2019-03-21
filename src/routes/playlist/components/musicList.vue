<template>
  <div id="musicList" ref="stopScroll" v-on:click="handleHideList">
    <div class="listMain">
      <header>循环播放(14)</header>
      <main class="scrollMain" ref="scrollMain">
        <ul>
          <template v-for="item in musicList">
            <li :key="item.id" v-if="currentMusic==item.id" class="currentMusic" ref="current_top">
              {{item.title}}
              <span>{{item.author}}</span>
            </li>
            <li v-else :key="item.id" v-on:click="handleSwitchMusic(item.id)">
              {{item.title}}
              <span>{{item.author}}</span>
            </li>
          </template>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  mounted() {
    this.$refs["scrollMain"].addEventListener(
      "touchmove",
      function(event) {
        event.stopPropagation();
        return false;
      },
      false
    );
    this.$refs["scrollMain"].addEventListener(
      "click",
      function(event) {
        event.stopPropagation();
      },
      false
    );
    this.$refs["scrollMain"].scrollTop =
      this.$refs["current_top"][0].offsetTop -
      this.$refs["current_top"][0].offsetHeight * 2;
  },
  props: {
    musicList: Array,
    currentMusic: Number
  },
  methods: {
    handleSwitchMusic(id) {
      this.$emit("switchMusic", id);
    },
    handleHideList() {
      this.$emit("showlist");
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  directives: {
    top(el) {
      // this.$refs["scrollMain"].scrollTop = el.offsetTop - 20;
      // console.log(el,a);
    }
  }
};
</script>

<style lang="scss" scoped>
#musicList {
  position: fixed;
  z-index: 999;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);

  .listMain {
    background-color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    box-shadow: 0 -2px 4px #888;
    .scrollMain {
      overflow-y: auto;
      height: 600px;
      ul {
        padding: 10px;
        li {
          border-bottom: 1px solid #f0f0f0;
          padding: 20px;
          font-size: 24px;
          position: relative;
          &.currentMusic {
            background-color: #f0f0f0;
          }
          span {
            position: absolute;
            right: 20px;
            font-size: 20px;
            color: #999;
          }
        }
      }
    }
    header {
      font-size: 26px;
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
      box-shadow: 0 2px 2px #eee;
    }
  }
}
</style>
