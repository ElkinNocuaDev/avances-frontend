// auth.ts
import { ref } from 'vue';

interface User {
  id: number;
  numero_identificacion: string;
  nombre: string;
  apellidos: string;
  rol: string;
  // Puedes agregar más campos según sea necesario
}

export function useAuth() {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);

  function setUser(userData: User) {
    isAuthenticated.value = true;
    user.value = userData;
  }

  function logout() {
    // Lógica de cierre de sesión
    isAuthenticated.value = false;
    user.value = null;
    // Redirigir a la página de inicio de sesión
    // Ajusta la ruta según tu configuración
    window.location.href = '/login';
  }

  return {
    isAuthenticated,
    user,
    setUser,
    logout,
  };
}
