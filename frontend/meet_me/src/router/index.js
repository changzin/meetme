import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Member from '../views/admin/Member.vue'
import Analysis from '../views/admin/Analysis.vue'

import MyPage from '../views/mypage/MyPage.vue'
import MyPageEdit from '../views/mypage/MyPageEdit.vue'
import ProfileGrade from '../views/mypage/ProfileGrade.vue'
import SendHeart from '../views/mypage/SendHeart.vue'
import Qna from '../views/mypage/Qna.vue'


import ChatRoom from '../views/chat/ChatRoom.vue'
import ChatList from '../views/chat/ChatList.vue'

import MainPage from '../views/MainPage.vue'
import UserLogin from '../views/nouser/UserLogin.vue'
import TempView from '../views/TempView.vue'
import SignUpTerms from '../views/nouser/SignUpTerms.vue'
import SignUp from '../views/nouser/SignUp.vue'
import EmailCheck from '../views/nouser/EmailCheck.vue'
import Profile_Input from '../views/profile/Profile_Input.vue'
import ReactiveWeb from '../views/ReactiveWeb.vue'
import Modal from '../components/Modal.vue'
import SelectModal from '../components/SelectModal.vue'
import User_Character from '../views/profile/User_Character.vue'

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
    path: '/character',
    name:'character',
    component:User_Character
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
    path : '/ChatRoom',
    name:'Chatroom',
    component: ChatRoom,
  },
  {
    path : '/chatlist',
    name:'Chatlist',
    component: ChatList,
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
    path: '/sendheart',
    name: 'SendHeart',
    component: SendHeart
  },
  {
    path: '/qna',
    name: 'Qna',
    component: Qna
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
