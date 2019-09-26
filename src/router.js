import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import PlayList from './routes/playlist/playlist.vue';

const routes = [
  {
    path: '/',
    redirect: "/playlist/2714253021"
  },
  {
    path: '/playlist/:id',
    component: PlayList
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
});


export default router;