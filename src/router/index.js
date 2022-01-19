import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"
import Home from "../views/Home"
import UserInfo from "../views/UserInfo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
            {
                path: '/userInfo',
                name: '个人中心',
                component: UserInfo
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router
