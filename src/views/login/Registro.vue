<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Salud Domiciliaria Avances SAS</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="register-container">
          <!-- Logo -->
          <img src="assets/logo.png" alt="Logo" class="login-logo" />
  
          <!-- Formulario de registro -->
          <div class="form-group">
            <div class="form-row">            
              <ion-item>
                <ion-label position="floating">No. de Identificación</ion-label>
                <ion-input v-model="numeroIdentificacion" type="text"></ion-input>
              </ion-item>

              <ion-item>
              <ion-label>Tipo</ion-label>
              <ion-select v-model="tipo">
                <ion-select-option value="profesional">Profesional</ion-select-option>
                <ion-select-option value="paciente">Paciente</ion-select-option>
                <!-- Agrega más opciones según sea necesario -->
              </ion-select>
            </ion-item>
            </div>
          </div>  

          <div class="form-group">
            <div class="form-row">

              <ion-item>
                <ion-label position="floating">Nombre</ion-label>
                <ion-input v-model="nombre" type="text"></ion-input>
              </ion-item>
            
              <ion-item>
                <ion-label position="floating">Apellidos</ion-label>
                <ion-input v-model="apellidos" type="text"></ion-input>
              </ion-item>
  
            </div>
          </div>
  
          <div class="form-group">
            <ion-item>
              <ion-label position="floating">Correo electrónico</ion-label>
              <ion-input v-model="correo" type="text"></ion-input>
            </ion-item>
          </div>
  
          <div class="form-group">
            <div class="form-row">
            <ion-item>
              <ion-label position="floating">Celular</ion-label>
              <ion-input v-model="celular" type="text"></ion-input>
            </ion-item>
  
            <ion-item>
                <ion-label position="floating">Ubicación</ion-label>
                <ion-input v-model="ubicacion" type="text"></ion-input>
            </ion-item>
            </div>
          </div>
  
          <div class="form-group">
            <ion-item>
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
          </div>
  
          <ion-button @click="register" expand="full" class="ion-margin-top">Registrarse</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  
  </script>
  
  <style scoped>
.ion-padding {
  --ion-padding-start: 0;
  --ion-padding-end: 0;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-logo {
  width: 100px; /* Ajusta el tamaño según tus necesidades */
  height: auto;
  margin-bottom: 20px;
}

.form-group {
  width: 100%;
  max-width: 400px; /* Ajusta según tus necesidades */
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

/* Añadido para el botón */
.ion-margin-top {
  margin-top: 16px;
}
</style>