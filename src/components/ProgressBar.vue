<template>
  <div class="progress-container">
    <!-- Progress Info -->
    <div class="progress-info row items-center justify-between q-mb-sm">
      <div class="text-caption text-grey-6">
        Pregunta {{ currentValue }} de {{ maxValue }}
      </div>
      <div class="text-caption text-weight-bold text-primary">
        {{ Math.round(progressPercent) }}%
      </div>
    </div>
    
    <!-- Progress Bar -->
    <q-linear-progress
      :value="progressValue"
      color="primary"
      track-color="grey-3"
      size="8px"
      rounded
      class="progress-bar"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number,
    required: true
  }
})

const progressValue = computed(() => {
  return props.maxValue > 0 ? props.currentValue / props.maxValue : 0
})

const progressPercent = computed(() => {
  return progressValue.value * 100
})
</script>

<style scoped>
.progress-container {
  width: 100%;
}

.progress-bar {
  border-radius: 4px;
  overflow: hidden;
}

.progress-info {
  font-size: 12px;
}
</style>
