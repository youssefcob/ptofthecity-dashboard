import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import Clinics from '../components/Dashboard/Clinics/Clinics.vue'
import Services from '../components/Dashboard/Services/Services.vue'

import Insurances from '@/components/Dashboard/Insurances/Insurances.vue'
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
        }
      ]
    }
    
  ]
})

export default router
