import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem("token") || ''
  },
  //同步修改state的值
  mutations: {
    SET_TOKEN:(state, token)=>{
      state.token = token
    }
  },
  //异步调用mutations里面的方法
  actions: {
    // 设置token
    setToken(context,token){
      context.commit('SET_TOKEN',token)
    },
    // 清除token
    clearToken(context){
      context.commit('SET_TOKEN','')
    }
  },
  modules: {
  }
})
