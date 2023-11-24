<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Salud Domiciliaria Avances SAS</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-container">
        <!-- Logo -->
        <img src="assets/logo.png" alt="Logo" class="login-logo" />

        <!-- Formulario de inicio de sesión -->
        <ion-item>
          <ion-label position="floating">Número de Identificación</ion-label>
          <ion-input v-model="numeroIdentificacion" id="numeroIdentificacion" name="numeroIdentificacion" type="text" ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input v-model="password" id="password" name="password" type="password" ></ion-input>
        </ion-item>

        <ion-button @click="login" expand="full">Iniciar sesión</ion-button>

        <!-- Mensaje de error -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <!-- Texto para redirigir a la página de registro -->
        <div class="register-link">
          <p>¿No tienes una cuenta?</p>
          <router-link to="/registro">Regístrate aquí</router-link>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router';


export default defineComponent({
  components: {
    IonInput,
  },
  data() {
    return {
      numeroIdentificacion: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        console.log('Número de Identificación:', this.numeroIdentificacion);
        console.log('Contraseña:', this.password);

        const response = await axios.post(
          'http://localhost:8000/api/usuarios/login',
          {
            numero_identificacion: this.numeroIdentificacion,
            password: this.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.token) {
          const user = response.data.user;

          if (user.rol === 'profesional') {
            this.$router.push('/dashboard/profesional');
          } else if (user.rol === 'paciente') {
            this.$router.push('/dashboard/paciente');
          }
        } else {
          this.error = 'Número de identificación o contraseña incorrectos';
        }
      } catch (err: any) {
        // Mostrar mensaje de error si la autenticación falla
        this.error = 'Ha ocurrido un error, por favor vuelva a intentarlo';
        console.error('Error al autenticar:', err.message);
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

.login-container {
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

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link p {
  margin-bottom: 5px;
}

.register-link a {
  color: var(--ion-color-primary);
  text-decoration: underline;
}
</style>
