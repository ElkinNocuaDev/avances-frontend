<template>
  <ion-page>
    <!-- Menú lateral -->
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Opciones</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item @click="navigateTo('historial')">Historias Médicas</ion-item>
          <ion-item @click="navigateTo('registrar-historia')">Registrar Historia Médica</ion-item>
          <ion-item @click="navigateTo('configuracion')">Configuración</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Encabezado -->
    <ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>

    <ion-label class="title">Profesional</ion-label>

    <ion-label v-if="user" class="user-info ion-text-end">
      - {{ user.nombre }} {{ user.apellidos }}
    </ion-label>


    <ion-buttons slot="end">
      <ion-button @click="logout">
        Cerrar sesión
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>


    <!-- Contenido principal -->
    <ion-content id="main-content" class="ion-padding">
      <ion-label class="title">Historial de Historias Médicas</ion-label>
      <ion-list>
        <ion-item v-for="historia in historialMedico" :key="historia.id">
          <ion-label>
            <h2>{{ historia.paciente }}</h2>
            <p>{{ historia.diagnostico }}</p>
            <p>{{ historia.fecha }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenu } from '@ionic/vue';
import { useAuth } from '@/composables/auth';
import { watch } from 'vue';

type HistoriaMedica = {
  id: number;
  paciente: string;
  diagnostico: string;
  fecha: string;
};

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
    IonLabel,
    IonMenu,
  },
  setup() {
    const { user, logout } = useAuth();
    const historialMedico = ref<HistoriaMedica[]>([
      {
        id: 1,
        paciente: 'Juan Pérez',
        diagnostico: 'Resfriado común',
        fecha: '2023-11-25',
      },
      {
        id: 2,
        paciente: 'María García',
        diagnostico: 'Dolor de cabeza',
        fecha: '2023-11-24',
      },
      // Agrega más historias según sea necesario
    ]);

    onBeforeMount(() => {
      console.log('DashboardProfesional se está montando');
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        user.value = parsedUser;
        console.log('Usuario recuperado desde localStorage:', parsedUser);
      } else {
        console.log('Usuario no encontrado en el almacenamiento local');
      }

      // Establecer un watcher solo si user no es null
      if (user.value) {
        watch(() => user.value, (newValue, oldValue) => {
          console.log('Usuario actualizado en DashboardProfesional:', newValue);
        });
      } else {
        console.log('Watcher no se ejecuta porque user es null');
      }
    });

    const navigateTo = (route: string) => {
      console.log(`Navegar a la ruta: ${route}`);
      // Utiliza tu lógica de redirección aquí
    };

    return {
      user,
      logout,
      navigateTo,
      historialMedico,
    };
  },
});
</script>

<style scoped>
ion-header {
  --ion-background-color: #f8f8f8; /* Cambia el color de fondo según tus preferencias */
}

ion-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px; /* Ajusta el relleno según tus preferencias */
}

.title {
  font-size: 1 rem; /* Ajusta el tamaño del título según tus preferencias */
  margin-top: 8px; /* Ajusta el margen superior al título según sea necesario */
  margin-bottom: 8px; /* Agrega un margen inferior al título según sea necesario */
  font-weight: bold; /* Agrega negrita al título si es necesario */
}

.user-info {
  font-size: 1rem; /* Ajusta el tamaño del texto de usuario según tus preferencias */
  margin-top: 4px; /* Ajusta el margen superior al texto de usuario según sea necesario */
  margin-bottom: 4px; /* Ajusta el margen inferior al texto de usuario según sea necesario */
  font-weight: normal; /* Puedes ajustar la negrita según tus preferencias */
}
</style>





