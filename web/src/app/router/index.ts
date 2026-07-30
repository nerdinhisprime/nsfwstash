import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/main'),
  },
  {
    path: '/signup',
    name: 'register',
    component: () => import('@/pages/register'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
