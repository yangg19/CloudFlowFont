import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { postRequest } from './utils/api'
import { putRequest } from './utils/api'
import { getRequest } from './utils/api'
import { deleteRequest } from './utils/api'
import store from './store'
import { initMenu } from './utils/menuList'
import 'font-awesome/css/font-awesome.css'
import { downloadRequest } from './utils/download'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.downloadRequest = downloadRequest
Vue.use(mavonEditor)

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 使用 router.beforeEach 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  // to 要去的路由; from 来自哪里的路由 ; next() 放行
  // 用户登录成功时，把 token 存入 sessionStorage，如果携带 token，初始化菜单，放行
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    // 如果用户不存在
    if (!window.sessionStorage.getItem('user')) {
      // 判断用户信息是否存在
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          // 存入用户信息，转字符串，存入 sessionStorage
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          // 同步用户信息 编辑用户
          store.commit('INIT_ADMIN', resp)
          next('/home')
        }
      })
    }
    next()
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/?redirect=' + to.path)
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
