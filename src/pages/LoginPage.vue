<template>
  <q-card class="auth-card">
    <q-card-section>
      <div class="text-h5 text-weight-bold text-center q-mb-lg">
        Iniciar Sesión
      </div>
      
      <q-form @submit="handleLogin" class="q-gutter-md">
        <q-input
          v-model="email"
          type="email"
          label="Email"
          outlined
          :rules="[val => !!val || 'El email es requerido']"
          color="primary"
        />
        
        <q-input
          v-model="password"
          type="password"
          label="Contraseña"
          outlined
          :rules="[val => !!val || 'La contraseña es requerida']"
          color="primary"
        />
        
        <q-banner
          v-if="errorMessage"
          class="text-white bg-negative q-mb-md"
          rounded
        >
          {{ errorMessage }}
        </q-banner>
        
        <q-btn
          type="submit"
          label="Ingresar"
          color="primary"
          size="lg"
          class="full-width"
          :loading="loading"
          no-caps
        />
      </q-form>
      
      <div class="text-center q-mt-lg">
        <p class="text-body2 text-grey-7">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-primary text-weight-bold">
            Regístrate
          </router-link>
        </p>
        
        <q-separator class="q-my-md" />
        
        <div class="demo-credentials">
          <p class="text-caption text-grey-6 q-mb-sm">
            Credenciales de demostración:
          </p>
          <p class="text-caption text-grey-7">
            Email: user@test.com<br>
            Contraseña: password123
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from 'src/store.js'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const success = store.login(email.value, password.value)
    
    if (success) {
      router.push('/')
    } else {
      errorMessage.value = 'Email o contraseña incorrectos'
    }
  } catch (error) {
    errorMessage.value = 'Error al iniciar sesión'
  }
  
  loading.value = false
}
</script>

<style scoped>
.auth-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.demo-credentials {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
}
</style>
