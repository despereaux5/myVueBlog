import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import "./axios"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './permission.js' // 路由拦截

// vue中使用axios的多种方式 https://www.jianshu.com/p/4a872643f5ea
Vue.prototype.$axios = axios  //挂在vue的原型链上 全局注册，使用方法为:this.$axios
Vue.use(Element)
Vue.use(mavonEditor)
Vue.config.productionTip = false // 阻止显示生产模式的消息


// 生成节点：https://blog.csdn.net/hahhahahaa/article/details/102682872
// h是 Vue.js 里面的 createElement 函数，这个函数的作用就是生成一个 VNode节点，
// render 函数得到这个 VNode 节点之后，
// 返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
