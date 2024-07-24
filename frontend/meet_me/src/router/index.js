import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
<<<<<<< HEAD
import TempView from '../views/TempView.vue'
=======
import MainPage from '../views/MainPage.vue'
>>>>>>> fc83538a97a9203f425b5f4c9592505d3713de29

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/mainpage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
<<<<<<< HEAD
  },
  {
    path: '/tempview',
    name: 'TempView',
    component: TempView
  },
=======
  }
>>>>>>> fc83538a97a9203f425b5f4c9592505d3713de29

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
