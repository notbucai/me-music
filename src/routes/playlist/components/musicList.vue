<template>
  <div id="musicList" ref="stopScroll">
    <div class="listMain">
      <header>循环播放(14)</header>
      <main class="scrollMain" ref="scrollMain">
        <ul>
          <li>
            起风了
            <span>猫猫村长</span>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
            <p>1234</p>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  mounted() {
    this.$refs['stopScroll'].addEventListener(
      "touchmove",
      function(event) {
        event.stopPropagation();
        event.preventDefault();
        // console.log(123);
        
      },
      { passive: false }
    );
    

    this.$refs["scrollMain"].addEventListener(
      "touchmove",
      function(event) {
        event.stopPropagation();
        // document.documentElement.style.overflow='hidden';
        // document.body.style.overflow='hidden';
        console.log(333);
        return false;
      },
      false
    );
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {}
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
  background-color: rgba(0, 0 , 0, .2);
  .listMain {
    background-color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    box-shadow: 0 -2px 4px #888;
    .scrollMain {
      overflow-y: auto;
      height: 600px;
      ul{
        padding: 10px;
        li{
          border-bottom: 1px solid #f0f0f0;
          padding: 20px;
          font-size: 24px;
          position: relative;
          span{
            position: absolute;
            right: 0;
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
