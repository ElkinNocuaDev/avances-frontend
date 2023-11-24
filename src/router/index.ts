import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Login from '../views/login/Login.vue'
import Registro from '../views/login/Registro.vue'
import DashboardProfesional from '../views/dashboard/DashboardProfesional.vue'
import DashboardPaciente from '../views/dashboard/DashboardPaciente.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
  },
  {
    path: '/dashboard/profesional',
    name: 'DashboardProfesional',
    component: DashboardProfesional,
  },
  {
    path: '/dashboard/paciente',
    name: 'DashboardPaciente',
    component: DashboardPaciente,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
