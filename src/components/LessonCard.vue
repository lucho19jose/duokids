<template>
  <q-card 
    class="lesson-card cursor-pointer transition-all"
    :class="{ 'lesson-completed': isCompleted }"
    @click="$emit('start-lesson', lesson.id)"
  >
    <q-card-section class="text-center q-pa-lg">
      <!-- Lesson Icon -->
      <div class="lesson-icon-container q-mb-md">
        <q-avatar 
          size="80px" 
          :class="isCompleted ? 'bg-green-2' : 'bg-primary'"
          text-color="white"
        >
          <q-icon :name="lesson.icon" size="40px" />
        </q-avatar>
        
        <!-- Completion checkmark -->
        <q-icon 
          v-if="isCompleted"
          name="check_circle"
          class="completion-badge"
          size="24px"
          color="green"
        />
      </div>
      
      <!-- Lesson Title -->
      <div class="text-h6 text-weight-bold text-grey-8 q-mb-sm">
        {{ lesson.title }}
      </div>
      
      <!-- Lesson Description -->
      <div class="text-body2 text-grey-6">
        {{ lesson.description }}
      </div>
      
      <!-- Quiz count -->
      <div class="text-caption text-grey-5 q-mt-sm">
        {{ lesson.quizzes.length }} preguntas
      </div>
    </q-card-section>
    
    <!-- Progress indicator for completed lessons -->
    <q-linear-progress 
      v-if="isCompleted"
      :value="1" 
      color="green" 
      size="4px"
    />
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { store } from 'src/store.js'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

defineEmits(['start-lesson'])

const isCompleted = computed(() => {
  return store.completedLessons.includes(props.lesson.id)
})
</script>

<style scoped>
.lesson-card {
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.lesson-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--q-primary);
}

.lesson-card:active {
  transform: translateY(-2px) scale(0.98);
}

.lesson-completed {
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
  border-color: #4caf50;
}

.lesson-icon-container {
  position: relative;
  display: inline-block;
}

.completion-badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: white;
  border-radius: 50%;
  padding: 2px;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
