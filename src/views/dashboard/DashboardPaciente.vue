<template>
    <ion-page>
      <!-- Encabezado -->
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Dashboard Paciente</ion-title>
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
            <ion-item @click="navigateTo('ruta1')">Opción 1</ion-item>
            <ion-item @click="navigateTo('ruta2')">Opción 2</ion-item>
            <!-- Agrega más opciones según sea necesario -->
          </ion-list>
        </ion-content>
      </ion-menu>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem } from '@ionic/vue';
  
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
    },
    methods: {
      navigateTo(route: string) {
        // Implementa la lógica de navegación a la ruta especificada
        // Puedes utilizar el router de Vue o el sistema de navegación que estés utilizando
        console.log(`Navegar a la ruta: ${route}`);
      },
    },
  });
  </script>
  
  <style scoped>
  /* Agrega estilos personalizados si es necesario */
  </style>