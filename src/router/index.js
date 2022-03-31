import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import UserInfo from '../views/UserInfo'
import PassInfo from '../components/adminInfo/PassInfo'
import MessageCenter from '../components/adminInfo/MessageCenter'

Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalReplace.call(this, location, onResolve, onReject) }
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true // 在路由循环时隐藏登录页面
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/userInfo',
        name: '个人中心',
        component: UserInfo
      },
      {
        path: '/passInfo',
        name: '密码修改',
        component: PassInfo
      },
      {
        path: '/messageCenter',
        name: '信息中心',
        component: MessageCenter
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
