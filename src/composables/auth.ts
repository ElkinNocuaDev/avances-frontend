// auth.ts
import { ref, readonly, Ref } from 'vue';
import { useRouter } from 'vue-router';

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
  const user: Ref<User | null> = ref(null);
  const router = useRouter();

  function setUser(userData: User) {
    console.log('setUser llamado con:', userData);
    isAuthenticated.value = true;
    user.value = userData;
    // Almacena la información en localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Usuario almacenado en localStorage:', userData);
  }
  

  function logout() {
    isAuthenticated.value = false;
    user.value = null;
    localStorage.removeItem('user'); // Elimina la información del localStorage
    router.replace('/login');
  }

  return {
    isAuthenticated,
    user,
    setUser,
    logout,
  };
}
