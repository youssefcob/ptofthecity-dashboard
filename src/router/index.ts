import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Clinics from '@/components/Dashboard/Clinics/Clinics.vue'
import Services from '@/components/Dashboard/Services/Services.vue'
import Reservations from '@/components/Dashboard/Reservations/Reservations.vue'
import Insurances from '@/components/Dashboard/Insurances/Insurances.vue'
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'home',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'clinics',
          component: Clinics
        },
        {
          path: 'insurances',
          component: Insurances
        },
        {
          path:'services',
          component: Services
        },
        {
          path:'reservations',
          component: Reservations
        },
        {
          path:'messages',
          component: () => import('@/components/Dashboard/Messages/Messages.vue')
        },
        {
          path:'careers',
          component: () => import('@/components/Dashboard/Careers/Careers.vue')
        },
        {
          path:'eligibility',
          component: () => import('@/components/Dashboard/Eligibility/Eligibility.vue')
        },
        {
          path: 'jobs',
          component: () => import('@/components/Dashboard/Jobs/Jobs.vue')
        },
        {
          path: 'faqs',
          component: () => import('@/components/Dashboard/FAQs/FAQs.vue')
        },
        {
          path: 'admins',
          component: () => import('@/components/Dashboard/Admins/Admins.vue')
        },
        {
          path: 'content',
          component: () => import('@/components/Dashboard/Content/Content.vue')
        }
      ]
    }
    
  ]
})

export default router
