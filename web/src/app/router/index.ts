import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Register = () => import('@/pages/register')
const Main = () => import('@/pages/main')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Main,
  },
  {
    path: '/signup',
    name: 'register',
    component: Register,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
