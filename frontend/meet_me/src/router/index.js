import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Member from '../views/admin/Member.vue'
import Analysis from '../views/admin/analysis.vue'

import MyPage from '../views/mypage/MyPage.vue'
import MyPageEdit from '../views/mypage/MyPageEdit.vue'

import MainPage from '../views/MainPage.vue'
import userLogin from '../views/nouser/userLogin.vue'
import TempView from '../views/TempView.vue'
import ReactiveWeb from '../views/ReactiveWeb.vue'

import Modal from '../components/Modal.vue'
import SelectModal from '../components/SelectModal.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/member',
    name: 'member',
    component: Member
  },
  {
    path: '/admin/analysis',
    name: 'analysis',
    component: Analysis
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'userLogin',
    component: userLogin
  },
  {
    path: '/tempview',
    name: 'TempView',
    component: TempView
  },
  {
    path: '/reactiveweb',
    name: 'ReactiveWeb',
    component: ReactiveWeb
  },
  {
    path: '/mypageedit',
    name: 'MyPageEdit',
    component: MyPageEdit
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal
  },
  {
    path: '/selectmodal',
    name: 'SelectModal',
    component: SelectModal
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
