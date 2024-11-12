import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about/:slug',
      name: 'about',
      component: () => import('@/views/DetailPage.vue'),
      props: {
        default: true
      }
    }
  ]
})

export default router
