import Vue from 'vue'
import Router from 'vue-router'
import ResetView from '@/views/reset-view'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'reset-view',
      component: ResetView
    }
  ]
})
