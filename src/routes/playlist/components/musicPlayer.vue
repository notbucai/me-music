<template>
  <main class="music_player">
    <div class="music_player-needle" ref="needle" :style="{ transform: `rotate(${cAngle}deg)`}">
      <div class="music_player-needle-key" v-on:touchstart="handleTouchstart">
        <img src="../../../assets/key.gif" alt>
      </div>
    </div>
    <div class="music_player-progres">
      <div class="progres-total"></div>
      <!-- 左右半圆 -->
      <div class="progres-semicircle_l"></div>
      <div class="progres-semicircle_r"></div>
      <!-- mask 左右蒙版 -->
      <!-- 左右遮罩 -->
      <div
        v-if="cAngle < 360"
        class="progres-mask_l"
        :style="{ transform: `rotate(${cAngle>=180?cAngle-180:0}deg)`}"
      ></div>
      <div
        v-if="cAngle <= 180"
        class="progres-mask_r"
        :style="{ transform: `rotate(${cAngle}deg)`}"
      ></div>
    </div>
    <div class="music_player-bg"></div>
    <div class="music_player-time">{{musicTimeShow}}</div>
    <div class="music_player-cover">
      <img :src="currentMusic.pic||c_img" alt>
    </div>
  </main>
</template>

<script>
import domUtil from "~/util/domUtil";
import c_img from "../../../assets/img/t_cover.jpeg";

export default {
  name: "MusicPlayer",
  props: {
    cAngle: Number,
    musicTimeShow: String,
    oldStart: Boolean,
    currentMusic: Object
  },
  data() {
    return {
      c_img: c_img
    };
  },
  methods: {
    handleTouchKey() {
      this.$emit("touchKey");
    },
    handleTouchstart() {
      const handleTouchmove = this.handleTouchmove;
      const handleRemoveTouchmove = this.handleRemoveTouchmove;

      this.$emit("pause");

      document.documentElement.addEventListener("touchmove", handleTouchmove, {
        passive: false
      });

      document.documentElement.addEventListener(
        "touchend",
        handleRemoveTouchmove
      );
    },
    handleTouchmove(event) {
      event.preventDefault();

      const needle = this.$refs["needle"];
      const N_y = domUtil.getOffsetTop(needle);
      const N_x = domUtil.getOffsetLeft(needle);

      const touch = event.changedTouches[0];
      const x = touch.pageX;
      const y = touch.pageY;

      const w = N_x - x;
      const h = N_y - y;

      const a_w = Math.abs(w);
      const a_h = Math.abs(h);
      // 求出对角线
      const diag = Math.sqrt(Math.pow(a_w, 2) + Math.pow(a_h, 2));

      // 180*Math.asin(0.5)/Math.PI  求出角度
      let angle = (180 * Math.asin(a_h / diag)) / Math.PI;

      // 判断 在哪个 象限 然后转换对应的角度
      if (w < 0 && h > 0) {
        angle = 90 - angle;
      } else if (w < 0 && h < 0) {
        angle = 90 + angle;
      } else if (w > 0 && h < 0) {
        angle = 180 + 90 - angle;
      } else if (w > 0 && h > 0) {
        angle = 180 + 90 + angle;
      }
      this.$emit("changeAngle", angle);
      // this.handleUpdateCurrentLen(angle);
    },
    handleRemoveTouchmove() {
      if (!this.oldStart) {
        this.$emit("play");
      }
      document.documentElement.removeEventListener(
        "touchmove",
        this.handleTouchmove,
        { passive: false }
      );
      document.documentElement.removeEventListener(
        "touchend",
        this.handleRemoveTouchmove
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.music_player {
  /* background-color: #fffa; */
  position: relative;
  width: 450px;
  height: 450px;
  margin: 60px auto;
  transition: all 0.8s;
  /* overflow: hidden; */
  &-needle {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    width: 0px;
    height: 0px;
    margin-left: 0px;
    transform: rotate(0);
    transition: transform 0.2s;
    &-key {
      position: absolute;
      top: -232px;
      left: 0;
      margin-left: -15px;
      width: 30px;
      height: 22px;
      background-color: #fff;
      border-radius: 16%;
      overflow: hidden;
      box-shadow: 0 0 8px #a18cd1;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-progres {
    .progres {
      position: absolute;
      /* height: 100%;
        width: 100%; */
      box-sizing: border-box;
      &-total {
        border: 10px solid #f1e8ff42;
        position: absolute;
        z-index: 40;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 50%;
      }
      &-mask_l,
      &-mask_r,
      &-semicircle_l,
      &-semicircle_r {
        position: absolute;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        /* background-color: rgba(255, 82, 189, 0.832); */
      }
      &-semicircle_l,
      &-semicircle_r {
        z-index: 20;
        /* background-color: rgba(126, 28, 255, 0.808); */
        border: 10px solid #a18cd1;
      }
      &-semicircle_l {
        left: 0;
        z-index: 10;
        border-right: none;
        border-radius: 225px 0 0 225px;
      }
      &-semicircle_r {
        right: 0;
        z-index: 15;
        border-left: none;
        border-radius: 0 225px 225px 0;
      }
      &-mask_l,
      &-mask_r {
        /* background-color: rgb(255, 255, 255); */
        transition: transform 0.4s;
        transform: rotate(0);
        border: 10px solid rgb(255, 255, 255);
      }
      &-mask_l {
        z-index: 12;
        left: 0;
        transform-origin: right;
        border-right: none;
        border-radius: 225px 0 0 225px;
      }
      &-mask_r {
        z-index: 20;
        right: 0;
        transform-origin: left;
        /* transform: rotate(120deg); */
        border-left: none;
        border-radius: 0 225px 225px 0;
      }
    }
  }
  &-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.644);
    box-shadow: 0 0 8px #fbc2eb;
  }
  &-time {
    position: relative;
    z-index: 100;
    top: 350px;
    text-align: center;
    display: inline-block;
    /* height: 28px; */
    line-height: 28px;
    padding: 0 16px;
    padding-top: 2px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.815);
  }
  &-cover {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    /* background-color: transparent; */
    align-items: center;
    justify-content: center;
    img {
      width: 88%;
      height: 88%;
      border-radius: 50%;
    }
  }
}
</style>
