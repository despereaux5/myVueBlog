import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'

Vue.use(VueRouter)

const routes = [
    // 主页面: http://localhost:8081/blogs
    // http://localhost:8081会自动转移到登录页面
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' } // 重定向
  },
    // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: Login // 也就是上面import的Login.vue
  },
    // 博客展示页面
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载: 访问路径的时候才加载vue页面
    component: () => import('../views/Blogs.vue')
  },
  // 博客新增页面
  /*增加需要权限*/
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  // 博客详情页面
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  // 博客编辑页面
  /*编辑需要权限*/
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
];
const router = new VueRouter({
  mode: 'history',// 依赖 HTML5 History API 和服务器配置
  base: process.env.BASE_URL,// 应用的基路径
  routes // 路由记录
})
export default router // 把router导出为一个模块
