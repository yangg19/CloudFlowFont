import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    // 保存所有组件公共数据
    state:{
        routes:[]
    },

    mutations:{
        initRoutes(state, data) {
            state.routes = data;
        }
    },

    actions:{}
})