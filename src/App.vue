<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { store } from 'src/store.js'

onMounted(() => {
  store.init()
})
</script>
