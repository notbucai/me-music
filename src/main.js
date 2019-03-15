import Vue from 'vue';
import App from './app.vue';

import router from './router';
import './plugins/axios';

import 'lib-flexible/flexible.js'
import './assets/css/global.scss';

new Vue({
  el: "#app",
  router,
  render: h => h(App),
  // render(h) { return h(App) } 
});