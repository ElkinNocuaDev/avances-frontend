// auth.ts
import { ref, readonly, Ref } from 'vue';
import { useRouter } from 'vue-router';

interface User {
  id: number;
  numero_identificacion: string;
  nombre: string;
  apellidos: string;
  rol: string;
  token: string;
  // Puedes agregar más campos según sea necesario
}

export function useAuth() {
  const isAuthenticated = ref(false);
  const user: Ref<User | null> = ref(null);
  const router = useRouter();

  function setUser(userData: { user: User; token: string }) {
    console.log('setUser llamado con:', userData.user, userData.token);
    isAuthenticated.value = true;
    user.value = userData.user;
    user.value.token = userData.token;
    // Almacena la información en localStorage
    localStorage.setItem('user', JSON.stringify(user.value));
    console.log('Usuario almacenado en localStorage:', user.value);
  }
  

  function logout() {
    isAuthenticated.value = false;
    user.value = null;
    localStorage.removeItem('user'); // Elimina la información del localStorage
    //router.replace('/login');
    const url = new URL('/login', window.location.origin)
    window.location.href = url.toString()
  }

  return {
    isAuthenticated,
    user,
    setUser,
    logout,
  };
}
