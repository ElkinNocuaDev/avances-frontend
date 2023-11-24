<template>
  <ion-page>
    <!-- Encabezado -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard Profesional</ion-title>
        <ion-title v-if="user" class="ion-text-end">
          ¡Hola, {{ user.nombre }} {{ user.apellidos }}!
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout">
            Cerrar sesión
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Contenido del Dashboard -->
    <ion-content class="ion-padding">
      <!-- Contenido del dashboard aquí -->
    </ion-content>

    <!-- Menú de navegación lateral -->
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menú</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <!-- Contenido del menú aquí -->
        <ion-list>
          <ion-item @click="navigateTo('historial')">Historial</ion-item>
          <ion-item @click="navigateTo('configuracion')">Configuración</ion-item>
          <!-- Agrega más opciones según sea necesario -->
        </ion-list>
      </ion-content>
    </ion-menu>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/vue';
import { useAuth } from '@/composables/auth'; // Importa el composable de autenticación
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
  },
  setup() {
    const { user, logout, isAuthenticated } = useAuth(); // Utiliza el composable de autenticación
    const router = useRouter();

    // Verificar la autenticación al cargar la página
    onMounted(() => {
      if (!isAuthenticated.value) {
        // Si no está autenticado, redirigir a la página de inicio de sesión
        router.push('/login');
      }
    });

    const navigateTo = (route: string) => {
      // Implementa la lógica de navegación a la ruta especificada
      // Puedes utilizar el router de Vue o el sistema de navegación que estés utilizando
      console.log(`Navegar a la ruta: ${route}`);
    };

    return {
      user,
      logout,
      navigateTo,
    };
  },
});
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
