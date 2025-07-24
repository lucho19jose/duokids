<template>
  <q-layout view="lHh Lpr lFf" class="auth-layout">
    <q-page-container>
      <q-page class="flex flex-center bg-gradient">
        <div class="auth-container">
          <div class="auth-header text-center q-mb-xl">
            <div class="logo-section">
              <q-icon name="school" size="64px" color="primary" />
              <h1 class="text-h3 text-weight-bold text-primary q-mt-md q-mb-none">
                DuoKids
              </h1>
              <p class="text-subtitle1 text-grey-7">
                ¡Aprende jugando!
              </p>
            </div>
          </div>
          
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
// No additional logic needed for auth layout
</script>

<style scoped>
.auth-layout {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.bg-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

.logo-section {
  margin-bottom: 2rem;
}

@media (max-width: 600px) {
  .auth-container {
    padding: 1rem;
    max-width: 350px;
  }
  
  .logo-section h1 {
    font-size: 2.5rem;
  }
}
</style>
