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

    <ion-label class="title">Paciente</ion-label>

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
    <ion-label class="title">Historias Médicas del Paciente</ion-label>
    <ion-list v-if="historialMedico.length">
  <ion-item v-for="historia in historialMedico" :key="historia.id">
    <ion-label>
      <h2>{{ historia.paciente }}</h2>
      <p>{{ historia.diagnostico }}</p>
      <p>{{ historia.fecha }}</p>
      <!-- Agrega más campos según sea necesario -->
      <p>Consecutivo: {{ historia.consecutivo }}</p>
      <p>Estado del paciente: {{ historia.estado_paciente }}</p>
      <p>Antecedentes: {{ historia.antecedentes }}</p>
      <p>Evolución final: {{ historia.evolucion_final }}</p>
      <p>Concepto profesional: {{ historia.concepto_profesional }}</p>
      <p>Recomendaciones: {{ historia.recomendaciones }}</p>
    </ion-label>
  </ion-item>
</ion-list>

    <div v-else>
      No hay historias médicas.
    </div>
  </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenu } from '@ionic/vue';
import { useAuth } from '@/composables/auth';
import { watch } from 'vue';
import axios from 'axios';

type HistoriaMedica = {
  id: number;
  paciente: string;
  diagnostico: string;
  fecha: string;
  consecutivo: string;
  estado_paciente: string;
  antecedentes: string;
  evolucion_final: string;
  concepto_profesional: string;
  recomendaciones: string;
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

    const historialMedico = ref<HistoriaMedica[]>([]);

onBeforeMount(async () => {
  console.log('DashboardProfesional se está montando');

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    user.value = parsedUser;
    console.log('Usuario recuperado desde localStorage:', parsedUser);

    // Verificar que user.value y user.value.token no sean nulos antes de hacer la solicitud HTTP
    if (user.value && user.value.token) {
      console.log('info usuario:', user.value);
      console.log('token usuario:', user.value.token);
      try {
        // Hacer la solicitud HTTP al backend
        const response = await axios.get(`http://localhost:8000/api/usuarios/${user.value.id}`, {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
            'Content-Type': 'application/json',
          },
        });

        // Asignar el historial médico obtenido del backend a la variable local
        historialMedico.value = response.data.historiasMedicas;
        console.log('Historial Médico:', historialMedico.value);
      } catch (error) {
        console.error('Error al obtener historias médicas:', error);
        // Manejar el error según sea necesario
      }
    } else {
      console.error('Usuario o token no disponibles');
      // Manejar la falta de usuario o token según sea necesario
    }

    // Establecer un watcher solo si user no es null
    if (user.value) {
      watch(() => user.value, (newValue, oldValue) => {
        console.log('Usuario actualizado en DashboardProfesional:', newValue);
      });
    } else {
      console.log('Watcher no se ejecuta porque user es null');
    }
  } else {
    console.log('Usuario no encontrado en el almacenamiento local');
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