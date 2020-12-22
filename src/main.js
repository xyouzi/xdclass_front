import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import Validator from 'vue-validator'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Validator);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: '/static/imgs/error.png',
  loading: '/static/imgs/loading.png',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})

Vue.config.productionTip = false

//路有拦截，拦截全部路由，每次操作路由都是被拦截进行判断
router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem("token");
  // 筛选需要穿token的路由，匹配route里面需要登录的路径，匹配到为true
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(token){
      next()
    }else{
      next({path:'/login'});
    }
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
