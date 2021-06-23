import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../components/Home.vue'
import ItemDes from '../views/ItemDes.vue'
import Cart from '../views/Cart.vue'
import Finish from '../views/Finish.vue'
import Rireki from '../views/Rireki.vue'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/itemdes/:id',
    name: 'ItemDes',
    component:ItemDes,
  },
  {
    path: '/cart',
    name: 'Cart',
    component:Cart,
  },
  {
    path: '/finish',
    name: 'Finish',
    component:Finish,
  },
  {
    path: '/rireki',
    name: 'Rireki',
    component:Rireki,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
