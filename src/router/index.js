import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardHome from '../views/DashboardHome.vue'
import TeamPage from '../views/TeamPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardHome
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectsPage.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: TeamPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
