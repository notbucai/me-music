import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import PlayList from './routes/playlist/playlist.vue';

const routes = [
  {
    path: '/playlist/:id',
    component: PlayList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});


export default router;