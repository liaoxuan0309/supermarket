import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
//懒加载的方式
const Home = () => import('../views/home/Home')
//直接从服务器一次性将我们的视图请求下载下来
import Categroy from '../views/category/Category'
import Cart from '../views/cart/Cart'
import Profile from '../views/profile/Profile'
import Detail from '../views/detail/Detail'

Vue.use(Router)

const routes=[
  /* {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  } */
  {
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },{
    path: '/category',
    component:Categroy
  },{
    path: '/cart',
    component:Cart
  },{
    path: '/profile',
    component:Profile
  },{
    path: '/detail/:iid',
    component:Detail
  }
]
const router= new Router({
  routes,
  mode:'history'
})
export default router
