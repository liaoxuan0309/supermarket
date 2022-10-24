import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入index.js
import tosat from 'components/common/tosat/index'

//导入fastclick（减少点击延迟的300ms）
import fastclick from 'fastclick'
//把这个功能添加到body上
fastclick.attach(document.body)

//导入懒加载
import vueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
//给$bus一个实例
Vue.prototype.$bus = new Vue()

//安装tosat
Vue.use(tosat)
//安装懒加载
Vue.use(vueLazyload)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
