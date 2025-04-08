import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [{
  path: '/base',
  component: () => import('@/layout/base-layout.vue'),
  children: [{
    path: 'config-list',
    component: () => import('@/views/config-list/index.vue')
  }, {
    path: 'low-code',
    component: () => import('@/views/low-code/index.vue')
  }]
}]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router