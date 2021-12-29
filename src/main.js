import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import store from "./store"
import {initMenu} from "./utils/menuList";
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.use(ElementUI, {size:'small'})
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

// 前置守卫
router.beforeEach((to, from, next) => {
  if(window.sessionStorage.getItem('tokenStr')) { // 获取用户信息，判断是否登录
    initMenu(router,store); // 初始化菜单
    // 判断用户信息是否存在
    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/admin/info').then(resp=>{
        if(resp) {
          // 存入用户信息
          window.sessionStorage.setItem('user', JSON.stringify(resp));
          next();
        }
      })
    }
    next();

  } else {
    // // 如果下个路由路径是登录页，则next
    // if (to.path === '/') {
    //   next();
    // } else {
    //   // 如果登录成功，可以手动拦截重定向去要去的页面
    //   next('/?redirect=' + to.path);
    // }
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
