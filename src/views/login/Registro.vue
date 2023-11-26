<template>
  <ion-page>  
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
              <ion-label>Usuario</ion-label>
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

        <ion-button @click.native="register" expand="full" class="ion-margin-top">Registrarse</ion-button>


        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <!-- Texto para redirigir a la página de registro -->
      <div class="register-link">
        <p>¿Ya tienes una cuenta?</p>
        <router-link :to="{ name: 'Login' }">Puedes ingresar aquí</router-link>
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { IonInput, IonSelectOption, IonSelect } from '@ionic/vue';

export default defineComponent({
components: {
    IonInput,
    IonSelect,
    IonSelectOption,
},
data() {
  return {
    numeroIdentificacion: '',
    tipo: '',
    nombre: '',
    apellidos: '',
    correo: '',
    celular: '',
    ubicacion: '',
    password: '',
    errorMessage: '',
    successMessage: '',
  };
},
methods: {

  async register() {

    console.log('Numero de Identificacion:', this.numeroIdentificacion);
    console.log('Tipo:', this.tipo);
    console.log('Nombre:', this.nombre);
    console.log('Apellido:', this.apellidos);
    console.log('Correo:', this.correo);
    console.log('Celular:', this.celular);
    console.log('Ubicación:', this.ubicacion);
    console.log('Password:', this.password);

    // Validar campos
    if (
      !this.numeroIdentificacion ||
      !this.tipo ||
      !this.nombre ||
      !this.apellidos ||
      !this.correo ||
      !this.celular ||
      !this.ubicacion ||
      !this.password
    ) {
      this.errorMessage = 'Completa todos los campos del formulario.';
      this.successMessage = ''; // Limpiar mensaje de éxito
      return;
    }

    // Crear objeto con datos del formulario
    const userData = {
      numero_identificacion: this.numeroIdentificacion,
      tipo: this.tipo,
      nombre: this.nombre,
      apellidos: this.apellidos,
      correo: this.correo,
      celular: this.celular,
      ubicacion: this.ubicacion,
      password: this.password,
    };

    try {
      // Enviar datos al backend con encabezado JSON
      const response = await axios.post('http://localhost:8000/api/usuarios/registro', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Limpiar el formulario
      this.numeroIdentificacion = '';
      this.tipo = '';
      this.nombre = '';
      this.apellidos = '';
      this.correo = '';
      this.celular = '';
      this.ubicacion = '';
      this.password = '';

      // Mostrar mensaje de éxito
      this.successMessage = 'Registro exitoso.';

      // Limpiar mensaje de error
      this.errorMessage = '';
    } catch (error) {
      // Mostrar mensaje de error
      this.errorMessage = 'Ocurrió un error durante el registro.';
      this.successMessage = ''; // Limpiar mensaje de éxito
      console.error(error);
    }
  },
},
});
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

.error-message,
.success-message {
color: red; /* o el color que desees para mensajes de error */
margin-top: 10px;
}
.success-message {
color: green; /* o el color que desees para mensajes de éxito */
}

</style>