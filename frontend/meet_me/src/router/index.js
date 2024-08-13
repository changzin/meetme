import { createRouter, createWebHistory } from 'vue-router'
import Member from '../views/admin/Member.vue'
import AdminAnalysis from '../views/admin/AdminAnalysis.vue'

import MyPage from '../views/mypage/MyPage.vue'
import MyPageEdit from '../views/mypage/MyPageEdit.vue'
import SendHeart from '../views/mypage/SendHeart.vue'
import Qna from '../views/mypage/Qna.vue'
import ProfileGrade from '../views/mypage/ProfileGrade.vue'
import SendStory from '../views/mypage/SendStory.vue'
import FeatureEdit from '../views/mypage/FeatureEdit.vue'


import ChatRoom from '../views/chat/ChatRoom.vue'
import ChatList from '../views/chat/ChatList.vue'

import MainPage from '../views/main/MainPage.vue'
import LoginUser from '../views/nouser/LoginUser.vue'
import SignUpTerms from '../views/nouser/SignUpTerms.vue'
import SignUp from '../views/nouser/SignUp.vue'
import EmailCheck from '../views/nouser/EmailCheck.vue'
import LoginBridge from '../views/nouser/LoginBridge.vue'
import ProfileInput from '../views/profile/ProfileInput.vue'
import ProfileIdol from '../views/profile/ProfileIdol.vue'
import ReactiveWeb from '../views/ReactiveWeb.vue'
import Modal from '../components/Modal.vue'
import SelectModal from '../components/SelectModal.vue'
import UserFeature from '../views/profile/UserFeature.vue'

import RecommendList from '../views/recommend/RecommendList.vue'
import ProfileDetail from '../views/profile/ProfileDetail.vue'
import ProfilePhoto from '../views/profile/ProfilePhoto.vue'
import ForgotPassword from '../views/nouser/ForgotPassword.vue'
import AlarmList from '../views/AlarmList.vue'
import MyPageStore from '../views/mypage/MyPageStore.vue'

const routes = [
  {
    path: '/admin/member',
    name: 'member',
    component: Member
  },
  {
    path: '/admin/analysis',
    name: 'adminanalysis',
    component: AdminAnalysis
  },
  {
    path: '/',
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
    name:'loginuser',
    component: LoginUser
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
    path:'/forgotpassword',
    name:'forgotpassword',
    component: ForgotPassword
  },
  {
    path:'/profile',
    name:'profile',
    component:ProfileInput
  },
  {
    path:'/profilephoto',
    name:'profilephoto',
    component:ProfilePhoto
  },
  {
    path:'/profile/idol',
    name:'idol',
    component:ProfileIdol
  },
  {
    path: '/feature',
    name:'userfeature',
    component:UserFeature
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
  },
  {
    path: '/loginbridge',
    name: 'LoginBridge',
    component: LoginBridge
  },
  {
    path: '/coinstore',
    name: 'mypagestore',
    component: MyPageStore
  },
  {
    path: '/featureedit',
    name: 'FeatureEdit',
    component: FeatureEdit
  },
  {
    path: '/alarmlist',
    name: 'AlarmList',
    component: AlarmList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
