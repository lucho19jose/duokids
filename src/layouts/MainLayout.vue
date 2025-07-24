<template>
  <q-layout view="hHh LpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-px-md" >
        <q-avatar size="40px" class="q-mr-sm pointer" @click="$router.push('/')">
          <q-icon name="school" size="md" />
        </q-avatar>

        <q-toolbar-title class="text-h5 text-weight-bold pointer" @click="$router.push('/')">
          DuoKids
        </q-toolbar-title>
        
        <q-space />
        
        <!-- Score display -->
        <div class="text-subtitle1 q-mr-md">
          <q-icon name="stars" class="q-mr-xs" />
          {{ store.score }} pts
        </div>
      </q-toolbar>
    </q-header>

    <!-- Main content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer class="bg-white text-grey-8 shadow-up-3">
      <q-tabs
        v-model="activeTab"
        class="text-grey-6"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab 
          name="home" 
          icon="home" 
          label="Aprender"
          @click="$router.push('/')"
        />
        <q-tab 
          name="profile" 
          icon="person" 
          label="Perfil"
          @click="$router.push('/profile')"
        />
        <q-tab 
          name="settings" 
          icon="settings" 
          label="Ajustes"
          disable
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { store } from 'src/store.js'

const router = useRouter()
const activeTab = ref('home')

// Watch route changes to update active tab
watch(() => router.currentRoute.value.path, (newPath) => {
  if (newPath === '/') {
    activeTab.value = 'home'
  } else if (newPath === '/profile') {
    activeTab.value = 'profile'
  }
}, { immediate: true })
</script>

<style scoped>
.shadow-up-3 {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.pointer {
  cursor: pointer;
}
</style>