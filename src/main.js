// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入elementui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入了拼图验证码  组件
import SlideVerify from 'vue-monoplasty-slide-verify';
//引入axios
import axios from 'axios';
import VueAxios from 'vue-axios';
//引入vue.js组件
import Video from 'video.js'
import 'video.js/dist/video-js.css'
//引入编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引入移动端vant组件
import Vant from 'vant';
import 'vant/lib/index.css';



Vue.prototype.$video=Video
//Vue.prototype.websiteUrl='http://localhost:8888';
Vue.prototype.websiteUrl='http://115.29.142.5:8888';
Vue.use(mavonEditor);//使用编辑器
Vue.use(ElementUI);//使用elementui
Vue.use(SlideVerify); //使用滑块验证组件
Vue.use(VueAxios,axios); //使用axios
Vue.config.productionTip = false
Vue.use(Vant);//使用vant组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
