import Vue from 'vue';
import Router from 'vue-router';

/**
 * bootstrap
 */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue, {
  ModalPlugin,
  LayoutPlugin,
  CardPlugin,
  VBScrollspyPlugin,
  DropdownPlugin,
  TablePlugin
} from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(CardPlugin);
Vue.use(VBScrollspyPlugin);
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);

/**
 * router設定
 */
Vue.use(Router);

/**
 * component
 */
import App from 'src/App.vue';
import info from 'src/component/info.vue';
import genre from 'src/component/genre.vue';
import search from 'src/component/search.vue';
import board from 'src/component/board/index.vue';

/**
 * router設定
 */
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: info },
    { path: '/rooms/:num', component: info },
    { path: '/rooms/:id/:num', component: genre },
    { path: '/search/:str/:num', component: search },
    { path: '/talks/:id/:num', component: board }
  ]
});

/**
 * vueを使えるようにする
 */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

/**
 * 戻るボタンでリロード
 * https://teratail.com/questions/61484
 */
window.addEventListener('popstate', e => {
  window.location.reload();
});
