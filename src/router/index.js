import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
const Home = () => import('@/views/home')
const Video = () => import('@/views/video')
const Question = () => import('@/views/question')
const My = () => import('@/views/my')
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'video',
        component: Video
      },
      {
        path: 'question',
        component: Question
      },
      {
        path: 'my',
        component: My
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
