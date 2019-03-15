<template>
  <section class="music_action">
    <button class="music_action-action music_action-way">
      <i class="iconfont">&#xe61d;</i>
    </button>
    <button class="music_action-action music_action-Last">
      <i class="iconfont">&#xe61e;</i>
    </button>
    <button class="music_action-action music_action-payl" v-on:click="handleAction('audio')">
      <i class="iconfont" v-if="cStatus">&#xe61c;</i>
      <i class="iconfont" v-else>&#xe621;</i>
    </button>
    <button class="music_action-action music_action-next">
      <i class="iconfont">&#xe61f;</i>
    </button>
    <button class="music_action-action music_action-list">
      <i class="iconfont">&#xe61b;</i>
    </button>
  </section>
</template>

<script>
export default {
  name: "",
  props: {
    cStatus: Boolean
  },
  methods: {
    handleAction(key) {
      this.$emit("play");
    }
  }
};
</script>

<style lang="scss" scoped>
.music_action {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  &-action {
    position: relative;
    border: none;
    outline: none;
    width: 90px;
    margin: 0 10px;
    padding: 8px;
    cursor: pointer;
    text-align: center;
    border-radius: 40px;
    background-color: transparent;
    transition: all 2s;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transition: all 2s;
      background-color: rgba(84, 0, 117, 0.1);
      opacity: 0;
    }

    &:active::after {
      opacity: 1;
      //设置初始状态
      transition: 0s;
    }
    &:focus {
      outline: none;
    }

    .iconfont {
      font-size: 40px;
      color: rgba(26, 0, 86, 0.71);
    }
  }
}
</style>
