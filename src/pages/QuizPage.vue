<template>
  <q-page class="quiz-page">
    <div class="page-container">
      <!-- Progress Bar -->
      <div class="progress-section q-pa-md">
        <ProgressBar 
          :current-value="store.currentQuestionIndex + 1"
          :max-value="store.getTotalQuestions()"
        />
      </div>

      <!-- Quiz Content -->
      <div class="quiz-content q-pa-md">
        <QuizQuestion
          v-if="currentQuiz"
          :quiz-data="currentQuiz"
          :selected-answer="store.selectedAnswer"
          @answer-selected="handleAnswerSelected"
        />
      </div>

      <!-- Feedback Section -->
      <div 
        v-if="store.showFeedback" 
        class="feedback-section"
        :class="store.isAnswerCorrect ? 'feedback-correct' : 'feedback-incorrect'"
      >
        <div class="feedback-content q-pa-lg">
          <div class="row items-center justify-between">
            <div class="feedback-text">
              <div class="feedback-title text-h6 text-weight-bold">
                {{ store.isAnswerCorrect ? '¡Correcto!' : '¡Oops!' }}
              </div>
              <div class="feedback-message text-body1">
                {{ currentQuiz.feedback }}
              </div>
            </div>
            
            <div class="feedback-icon">
              <q-icon 
                :name="store.isAnswerCorrect ? 'check_circle' : 'cancel'"
                size="40px"
                :color="store.isAnswerCorrect ? 'white' : 'white'"
              />
            </div>
          </div>
          
          <div class="feedback-actions q-mt-md">
            <q-btn
              :label="store.isLastQuestion() ? 'Completar Lección' : 'Continuar'"
              color="white"
              :text-color="store.isAnswerCorrect ? 'green' : 'red'"
              size="lg"
              class="full-width continue-button"
              no-caps
              @click="handleContinue"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from 'src/store.js'
import QuizQuestion from 'components/QuizQuestion.vue'
import ProgressBar from 'components/ProgressBar.vue'

const router = useRouter()
const route = useRoute()

const currentQuiz = computed(() => store.getCurrentQuiz())

onMounted(() => {
  const lessonId = route.params.lessonId
  if (lessonId !== store.currentLessonId) {
    store.startLesson(lessonId)
  }
  
  // Redirect if lesson not found
  if (!store.getCurrentLesson()) {
    router.push('/')
  }
})

function handleAnswerSelected(option) {
  store.selectAnswer(option)
}

function handleContinue() {
  if (store.isLastQuestion()) {
    // Complete the lesson and go to success page
    store.completeLesson()
    router.push('/success')
  } else {
    // Go to next question
    store.nextQuestion()
  }
}
</script>

<style scoped>
.quiz-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.progress-section {
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.quiz-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.feedback-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transform: translateY(100%);
  animation: slideUp 0.3s ease forwards;
}

.feedback-correct {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
}

.feedback-incorrect {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
}

.feedback-content {
  padding: 1.5rem;
}

.feedback-title {
  margin-bottom: 0.5rem;
}

.feedback-message {
  opacity: 0.9;
}

.feedback-icon {
  flex-shrink: 0;
  margin-left: 1rem;
}

.continue-button {
  border-radius: 12px;
  font-weight: 600;
  padding: 12px 24px;
  border: 2px solid white;
  transition: all 0.2s ease;
}

.continue-button:hover {
  transform: translateY(-2px);
}

.continue-button:active {
  transform: translateY(0) scale(0.98);
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .quiz-content {
    padding: 1rem;
  }
  
  .feedback-content {
    padding: 1rem;
  }
  
  .feedback-text {
    flex: 1;
    margin-right: 1rem;
  }
}
</style>
