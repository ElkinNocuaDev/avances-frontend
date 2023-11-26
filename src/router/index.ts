import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuth } from '@/composables/auth';
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
    component: HomePage,
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/paciente',
    name: 'DashboardPaciente',
    component: DashboardPaciente,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirigir a la página de inicio de sesión si no estás autenticado
    next('/login');
  } else {
    next();
  }
});

export default router
