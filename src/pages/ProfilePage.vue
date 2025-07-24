<template>
  <q-page class="profile-page">
    <div class="page-container q-pa-md">
      <!-- Profile Header -->
      <div class="profile-header text-center q-mb-xl">
        <div class="profile-avatar q-mb-md">
          <q-avatar size="100px" class="bg-primary">
            <q-icon name="child_care" size="50px" color="white" />
          </q-avatar>
          <q-badge 
            color="green" 
            floating 
            rounded
            class="level-badge"
          >
            Nivel {{ userLevel }}
          </q-badge>
        </div>
        
        <h4 class="text-h4 text-weight-bold text-grey-8 q-ma-none q-mb-sm">
          Leo García
        </h4>
        <p class="text-body1 text-grey-6 q-ma-none">
          Estudiante Estrella ⭐
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-section q-mb-xl">
        <div class="row q-gutter-md justify-center">
          <!-- Total Points -->
          <div class="col-12 col-sm-6">
            <q-card class="stat-card points-card">
              <q-card-section class="text-center q-pa-lg">
                <q-icon name="stars" size="40px" color="amber" class="q-mb-sm" />
                <div class="text-h4 text-weight-bold text-primary">
                  {{ store.score }}
                </div>
                <div class="text-body2 text-grey-6">
                  Puntos Totales
                </div>
              </q-card-section>
            </q-card>
          </div>
          
          <!-- Completed Lessons -->
          <div class="col-12 col-sm-6">
            <q-card class="stat-card lessons-card">
              <q-card-section class="text-center q-pa-lg">
                <q-icon name="school" size="40px" color="green" class="q-mb-sm" />
                <div class="text-h4 text-weight-bold text-green">
                  {{ store.completedLessons.length }}
                </div>
                <div class="text-body2 text-grey-6">
                  Lecciones Completadas
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="progress-section q-mb-xl">
        <h5 class="text-h6 text-weight-bold text-grey-8 q-mb-md">
          Mi Progreso
        </h5>
        
        <q-card class="progress-card">
          <q-card-section class="q-pa-lg">
            <div class="progress-item q-mb-md">
              <div class="row items-center justify-between q-mb-sm">
                <div class="text-body1 text-weight-medium">
                  Razonamiento Verbal
                </div>
                <div class="text-body2 text-grey-6">
                  {{ store.completedLessons.length }}/{{ store.lessons.length }}
                </div>
              </div>
              <q-linear-progress
                :value="overallProgress"
                color="primary"
                track-color="grey-3"
                size="8px"
                rounded
              />
              <div class="text-caption text-grey-6 q-mt-xs">
                {{ Math.round(overallProgress * 100) }}% completado
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Achievements Section -->
      <div class="achievements-section q-mb-xl">
        <h5 class="text-h6 text-weight-bold text-grey-8 q-mb-md">
          Logros Obtenidos
        </h5>
        
        <div class="row q-gutter-md justify-center">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.id"
            class="col-6 col-sm-4"
          >
            <q-card 
              class="achievement-card text-center"
              :class="{ 'achievement-unlocked': achievement.unlocked }"
            >
              <q-card-section class="q-pa-md">
                <q-icon 
                  :name="achievement.icon" 
                  size="30px" 
                  :color="achievement.unlocked ? achievement.color : 'grey-4'"
                  class="q-mb-sm"
                />
                <div class="text-caption text-weight-medium">
                  {{ achievement.title }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Learning Streak -->
      <div class="streak-section">
        <q-card class="streak-card">
          <q-card-section class="q-pa-lg">
            <div class="row items-center">
              <div class="col">
                <q-icon name="local_fire_department" size="40px" color="orange" class="q-mr-md" />
              </div>
              <div class="col-grow">
                <div class="text-h6 text-weight-bold text-grey-8">
                  Racha de Aprendizaje
                </div>
                <div class="text-body2 text-grey-6">
                  ¡Sigue practicando todos los días!
                </div>
              </div>
              <div class="col-auto">
                <div class="text-h4 text-weight-bold text-orange">
                  {{ learningStreak }}
                </div>
                <div class="text-caption text-grey-6 text-center">
                  días
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { store } from 'src/store.js'

const userLevel = computed(() => {
  return Math.floor(store.score / 100) + 1
})

const overallProgress = computed(() => {
  return store.lessons.length > 0 ? store.completedLessons.length / store.lessons.length : 0
})

const learningStreak = computed(() => {
  return store.completedLessons.length > 0 ? store.completedLessons.length : 1
})

const achievements = computed(() => [
  {
    id: 'first-lesson',
    title: 'Primera Lección',
    icon: 'school',
    color: 'green',
    unlocked: store.completedLessons.length >= 1
  },
  {
    id: 'quick-learner',
    title: 'Aprendiz Rápido',
    icon: 'flash_on',
    color: 'yellow',
    unlocked: store.score >= 50
  },
  {
    id: 'word-master',
    title: 'Maestro de Palabras',
    icon: 'auto_stories',
    color: 'blue',
    unlocked: store.completedLessons.length >= 2
  },
  {
    id: 'perfectionist',
    title: 'Perfeccionista',
    icon: 'emoji_events',
    color: 'amber',
    unlocked: store.score >= 100
  },
  {
    id: 'dedicated',
    title: 'Dedicado',
    icon: 'favorite',
    color: 'red',
    unlocked: store.completedLessons.length >= 3
  },
  {
    id: 'scholar',
    title: 'Erudito',
    icon: 'psychology',
    color: 'purple',
    unlocked: store.completedLessons.length === store.lessons.length
  }
])
</script>

<style scoped>
.profile-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 100px; /* Account for bottom navigation */
}

.profile-header {
  padding: 2rem 0 1rem;
}

.profile-avatar {
  position: relative;
  display: inline-block;
}

.level-badge {
  font-size: 11px;
  padding: 4px 8px;
}

.stat-card {
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.points-card {
  background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);
  border: 2px solid #ffb300;
}

.lessons-card {
  background: linear-gradient(135deg, #e8f5e8 0%, #ffffff 100%);
  border: 2px solid #4caf50;
}

.progress-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.achievement-card {
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  min-height: 100px;
  display: flex;
  align-items: center;
}

.achievement-unlocked {
  background: linear-gradient(135deg, #f0f8f0 0%, #ffffff 100%);
  border-color: #4caf50;
  transform: scale(1.02);
}

.achievement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.achievement-unlocked:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.2);
}

.streak-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
  border: 2px solid #ff9800;
}

@media (max-width: 600px) {
  .page-container {
    padding: 1rem;
    padding-bottom: 100px;
  }
  
  .profile-header {
    padding: 1rem 0;
  }
  
  .text-h4 {
    font-size: 1.75rem;
  }
  
  .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
