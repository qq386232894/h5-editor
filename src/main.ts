// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from './modules/editor/common/dialog/index.js'
import Tooltip from 'vue-directive-tooltip';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './modules/editor/common/dragable/Draggable'
Vue.use(BootstrapVue);

Vue.use(Tooltip,{
  delay:0//隐藏的时候不需要延迟
});
Vue.use(VModal)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
