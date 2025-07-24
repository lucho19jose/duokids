<template>
  <q-card class="auth-card">
    <q-card-section>
      <div class="text-h5 text-weight-bold text-center q-mb-lg">
        Crear Cuenta
      </div>
      
      <q-form @submit="handleRegister" class="q-gutter-md">
        <q-input
          v-model="username"
          label="Nombre de usuario"
          outlined
          :rules="[val => !!val || 'El nombre de usuario es requerido']"
          color="primary"
        />
        
        <q-input
          v-model="email"
          type="email"
          label="Email"
          outlined
          :rules="[
            val => !!val || 'El email es requerido',
            val => /.+@.+\..+/.test(val) || 'Email inválido'
          ]"
          color="primary"
        />
        
        <q-input
          v-model="password"
          type="password"
          label="Contraseña"
          outlined
          :rules="[
            val => !!val || 'La contraseña es requerida',
            val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
          ]"
          color="primary"
        />
        
        <q-input
          v-model="confirmPassword"
          type="password"
          label="Confirmar contraseña"
          outlined
          :rules="[
            val => !!val || 'Confirma tu contraseña',
            val => val === password || 'Las contraseñas no coinciden'
          ]"
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
          label="Crear Cuenta"
          color="primary"
          size="lg"
          class="full-width"
          :loading="loading"
          no-caps
        />
      </q-form>
      
      <div class="text-center q-mt-lg">
        <p class="text-body2 text-grey-7">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="text-primary text-weight-bold">
            Inicia sesión
          </router-link>
        </p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from 'src/store.js'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleRegister() {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const success = store.register(username.value, email.value, password.value)
    
    if (success) {
      router.push('/')
    } else {
      errorMessage.value = 'Este email ya está registrado'
    }
  } catch (error) {
    errorMessage.value = 'Error al crear la cuenta'
  }
  
  loading.value = false
}
</script>

<style scoped>
.auth-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
