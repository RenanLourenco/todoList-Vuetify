import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardHome from '../views/DashboardHome.vue'
import TeamPage from '../views/TeamPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ExamplePage from '../views/ExamplePage.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'



Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardHome,
    meta:{
      requiresAuth:true
    }
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
  },
  {
    path:'/',
    name:'login',
    component:LoginPage
  },
  {
    path:'/register',
    name:'register',
    component:RegisterPage
  },
  {
    path:'/exemplo',
    name:'exemplo',
    component:ExamplePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const authenticatedUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth && !authenticatedUser) next('/')
  else next()
})

export default router
