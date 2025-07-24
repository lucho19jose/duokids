<template>
  <q-page class="success-page">
    <div class="page-container q-pa-md">
      <!-- Confetti Animation -->
      <div class="confetti-container">
        <div 
          v-for="i in 50" 
          :key="i"
          class="confetti"
          :style="getConfettiStyle(i)"
        ></div>
      </div>

      <!-- Success Content -->
      <div class="success-content text-center">
        <!-- Success Icon -->
        <div class="success-icon q-mb-lg">
          <q-avatar size="120px" class="bg-green-5">
            <q-icon name="emoji_events" size="60px" color="white" />
          </q-avatar>
        </div>

        <!-- Success Message -->
        <h3 class="text-h3 text-weight-bold text-grey-8 q-mb-md">
          ¡Lección Completada!
        </h3>
        
        <p class="text-h6 text-grey-6 q-mb-xl">
          ¡Excelente trabajo, Leo! 🎉
        </p>

        <!-- Stats -->
        <div class="stats-section q-mb-xl">
          <q-card class="stats-card">
            <q-card-section class="q-pa-lg">
              <div class="row q-gutter-lg justify-center">
                <div class="stat-item text-center">
                  <q-icon name="stars" size="40px" color="amber" class="q-mb-sm" />
                  <div class="text-h4 text-weight-bold text-primary">
                    {{ pointsEarned }}
                  </div>
                  <div class="text-body2 text-grey-6">
                    Puntos Ganados
                  </div>
                </div>
                
                <q-separator vertical />
                
                <div class="stat-item text-center">
                  <q-icon name="trending_up" size="40px" color="green" class="q-mb-sm" />
                  <div class="text-h4 text-weight-bold text-green">
                    {{ store.completedLessons.length }}
                  </div>
                  <div class="text-body2 text-grey-6">
                    Lecciones Completadas
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Motivational Message -->
        <div class="motivation-message q-mb-xl">
          <q-card class="motivation-card">
            <q-card-section class="q-pa-lg">
              <q-icon name="lightbulb" size="30px" color="orange" class="q-mb-sm" />
              <div class="text-body1 text-grey-7">
                "{{ getRandomMotivationalMessage() }}"
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <q-btn
            label="Volver al Inicio"
            color="primary"
            size="lg"
            class="action-button q-mb-md"
            no-caps
            @click="goHome"
          />
          
          <br>
          
          <q-btn
            label="Ver Mi Perfil"
            color="secondary"
            size="md"
            flat
            class="action-button"
            no-caps
            @click="goToProfile"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from 'src/store.js'

const router = useRouter()
const pointsEarned = ref(100) // Fixed points for completing a lesson

const motivationalMessages = [
  "¡Sigue así y serás un experto en palabras!",
  "Tu cerebro está creciendo con cada respuesta correcta",
  "¡Eres increíble aprendiendo nuevas palabras!",
  "Cada lección te hace más inteligente",
  "¡Tu dedicación es admirable!"
]

onMounted(() => {
  // Add some confetti animation delay
  setTimeout(() => {
    // Could add sound effects here in a real app
  }, 500)
})

function getRandomMotivationalMessage() {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
}

function getConfettiStyle(index) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomLeft = Math.random() * 100
  const randomDelay = Math.random() * 3
  const randomDuration = 3 + Math.random() * 2
  
  return {
    backgroundColor: randomColor,
    left: `${randomLeft}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`
  }
}

function goHome() {
  router.push('/')
}

function goToProfile() {
  router.push('/profile')
}
</script>

<style scoped>
.success-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.page-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding-top: 2rem;
  padding-bottom: 100px; /* Account for bottom navigation */
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: confetti-fall linear infinite;
  top: -10px;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.success-content {
  position: relative;
  z-index: 2;
}

.success-icon {
  position: relative;
}

.success-icon::after {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 4px solid rgba(76, 175, 80, 0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.stats-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.motivation-card {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.stat-item {
  min-width: 120px;
}

.action-button {
  border-radius: 25px;
  padding: 12px 32px;
  font-weight: 600;
  min-width: 200px;
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.action-button:active {
  transform: translateY(0) scale(0.98);
}

/* Text color override for visibility on gradient background */
.text-h3, .text-h6 {
  color: white !important;
}

@media (max-width: 600px) {
  .page-container {
    padding: 1rem;
    padding-bottom: 100px;
  }
  
  .text-h3 {
    font-size: 1.75rem;
  }
  
  .stats-card .row {
    flex-direction: column;
  }
  
  .stats-card .q-separator {
    display: none;
  }
  
  .stat-item:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
