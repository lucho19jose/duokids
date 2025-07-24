<template>
  <q-page class="index-page">
    <div class="page-container q-pa-md">
      <!-- Welcome Header -->
      <div class="welcome-section text-center q-mb-xl">
        <div class="welcome-avatar q-mb-md">
          <q-avatar size="80px" class="bg-primary">
            <q-icon name="face" size="40px" color="white" />
          </q-avatar>
        </div>
        <h4 class="text-h4 text-weight-bold text-grey-8 q-ma-none q-mb-sm">
          ¡Hola, Leo! 👋
        </h4>
        <p class="text-body1 text-grey-6 q-ma-none">
          ¿Listo para aprender {{ store.subject }}?
        </p>
      </div>

      <!-- Lessons Grid -->
      <div class="lessons-section">
        <h5 class="text-h6 text-weight-bold text-grey-8 q-mb-md">
          Lecciones Disponibles
        </h5>
        
        <div class="row q-gutter-md">
          <div 
            v-for="lesson in store.lessons" 
            :key="lesson.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <LessonCard 
              :lesson="lesson"
              @start-lesson="startLesson"
            />
          </div>
        </div>
      </div>

      <!-- Progress Summary -->
      <div v-if="store.completedLessons.length > 0" class="progress-section q-mt-xl">
        <q-card class="progress-summary-card">
          <q-card-section class="text-center">
            <q-icon name="emoji_events" size="40px" color="amber" class="q-mb-sm" />
            <div class="text-h6 text-weight-bold text-grey-8">
              ¡Progreso Excelente!
            </div>
            <div class="text-body2 text-grey-6 q-mt-sm">
              Has completado {{ store.completedLessons.length }} de {{ store.lessons.length }} lecciones
            </div>
            <div class="text-h5 text-weight-bold text-primary q-mt-sm">
              {{ store.score }} puntos ganados
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { store } from 'src/store.js'
import LessonCard from 'components/LessonCard.vue'

const router = useRouter()

function startLesson(lessonId) {
  store.startLesson(lessonId)
  router.push(`/quiz/${lessonId}`)
}
</script>

<style scoped>
.index-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 100px; /* Account for bottom navigation */
}

.welcome-section {
  padding: 2rem 0;
}

.welcome-avatar {
  display: inline-block;
  position: relative;
}

.welcome-avatar::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 3px solid var(--q-primary);
  border-radius: 50%;
  opacity: 0.3;
}

.lessons-section {
  margin-top: 2rem;
}

.progress-summary-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
  border: 2px solid #ff9800;
}

@media (max-width: 600px) {
  .page-container {
    padding: 1rem;
  }
  
  .welcome-section {
    padding: 1rem 0;
  }
  
  .text-h4 {
    font-size: 1.75rem;
  }
}
</style>
