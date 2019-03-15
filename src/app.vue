<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  async created() {
    // const [res,err] = await this.$get("/api/playlist/detail?id=2689009734");
    // console.log(res.data.result.tracks,err);
  }
};
</script>

<style lang="scss" scoped>
#app {
  /* position: relative; */
  min-height: 2000px;
  background: #a18cd1;
  /* position: absolute; */
  /* left: 0; */
  /* right: 0; */
  /* top: 0; */
  /* @media (min-width: 800px) {
    max-width: 600px;
  } */
}
</style>
