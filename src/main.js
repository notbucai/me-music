import Vue from 'vue';
import App from './app.vue';

import router from './router';
import './plugins/axios';

import 'lib-flexible/flexible.js'
import './assets/css/global.scss';

const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

new Vue({
  el: "#app",
  router,
  render: h => h(App),
  // render(h) { return h(App) } 
});