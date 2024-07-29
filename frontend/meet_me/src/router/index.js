import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Member from '../views/admin/Member.vue'
import Analysis from '../views/admin/analysis.vue'
import MyPage from '../views/mypage/MyPage.vue'
import MyPageEdit from '../views/mypage/MyPageEdit.vue'

import ProfileGrade from '../views/mypage/ProfileGrade.vue'
import SendStory from '../views/mypage/SendStory.vue'


import MainPage from '../views/MainPage.vue'
import UserLogin from '../views/nouser/userLogin.vue'
import TempView from '../views/TempView.vue'
import SignUpTerms from '../views/nouser/SignUpTerms.vue'
import SignUp from '../views/nouser/SignUp.vue'
import EmailCheck from '../views/nouser/EmailCheck.vue'
import Profile_Input from '../views/profile/Profile_Input.vue'
import ProfileDetail from '../views/profile/ProfileDetail.vue'
import ReactiveWeb from '../views/ReactiveWeb.vue'
import Modal from '../components/Modal.vue'
import SelectModal from '../components/SelectModal.vue'
import RecommendList from '../views/RecommendList.vue'

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
    name:'UserLogin',
    component: UserLogin
  },
  {
    path:'/terms',
    name:'terms',
    component: SignUpTerms
  },
  {
    path:'/signup',
    name:'signup',
    component: SignUp
  },
  {
    path:'/emailcheck',
    name:'emailcheck',
    component: EmailCheck

  },
  {
    path:'/profile',
    name:'profile',
    component:Profile_Input

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

    path: '/profilegrade',
    name: 'ProfileGrade',
    component: ProfileGrade
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
  },
  {
    path: '/recommendlist',
    name: 'RecommendList',
    component: RecommendList
  },
  {
    path: '/profiledetail',
    name: 'ProfileDetail',
    component: ProfileDetail
  },
  {
    path: '/sendstory',
    name: 'SendStory',
    component: SendStory
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
