// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'; //  http://fontawesome.io
import axios from 'axios'

Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// axios.defaults.baseURL = '/api';

// 转换所有post的头格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 转换所有get的form的发送类型
// axios.defaults.headers.Accept = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.transformRequest = [function (data) {
//     // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
//     return encodeURI(data);
//   }]

// axios.defaults.headers.token = loginInfo._sid;
// axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
// router.beforeEach((to, from, next) => {
//   console.log(to.path)
//   if (to.path !== undefined) {
//     next({ path: '/5i5j/overview' });
//   } else {
//     next();
//   };

//   if (to.path == '/404') {
//     sessionStorage.removeItem('loginInfo');
//   };
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
