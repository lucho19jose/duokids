<template>
  <div class="quiz-question">
    <!-- Question Image (if available) -->
    <div v-if="quizData.image" class="question-image q-mb-lg">
      <q-img
        :src="quizData.image"
        :ratio="16/9"
        class="rounded-borders"
        style="max-width: 300px; margin: 0 auto;"
      />
    </div>
    
    <!-- Question Text -->
    <div class="question-text text-center q-mb-xl">
      <h5 class="text-h5 text-weight-medium text-grey-8 q-ma-none">
        {{ quizData.questionText }}
      </h5>
    </div>
    
    <!-- Answer Options -->
    <div class="options-container">
      <div class="row q-gutter-md justify-center">
        <div 
          v-for="(option, index) in quizData.options" 
          :key="index"
          class="col-12 col-sm-6"
        >
          <q-btn
            :label="option.text"
            :class="getOptionClass(option)"
            :disable="selectedAnswer !== null"
            class="option-button full-width"
            size="lg"
            no-caps
            @click="selectOption(option)"
          >
            <!-- Check or X icon for feedback -->
            <q-icon 
              v-if="selectedAnswer && selectedAnswer === option"
              :name="option.isCorrect ? 'check' : 'close'"
              class="q-ml-sm"
            />
            <q-icon 
              v-else-if="selectedAnswer && option.isCorrect && !selectedAnswer.isCorrect"
              name="check"
              class="q-ml-sm"
            />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  quizData: {
    type: Object,
    required: true
  },
  selectedAnswer: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['answer-selected'])

function selectOption(option) {
  if (props.selectedAnswer === null) {
    emit('answer-selected', option)
  }
}

function getOptionClass(option) {
  const baseClass = 'option-button text-weight-medium'
  
  if (props.selectedAnswer === null) {
    return `${baseClass} bg-white text-grey-8 option-default`
  }
  
  // Show feedback after selection
  if (props.selectedAnswer === option) {
    return option.isCorrect 
      ? `${baseClass} bg-green text-white option-correct`
      : `${baseClass} bg-red text-white option-incorrect`
  }
  
  // Highlight correct answer if user selected wrong
  if (option.isCorrect && !props.selectedAnswer.isCorrect) {
    return `${baseClass} bg-green text-white option-correct`
  }
  
  // Dim other options
  return `${baseClass} bg-grey-3 text-grey-6 option-disabled`
}
</script>

<style scoped>
.quiz-question {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
}

.question-text {
  line-height: 1.4;
}

.option-button {
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  padding: 16px 20px;
  font-size: 16px;
  min-height: 60px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.option-default:hover {
  border-color: var(--q-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.option-default:active {
  transform: translateY(0) scale(0.98);
}

.option-correct {
  border-color: #4caf50 !important;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3) !important;
}

.option-incorrect {
  border-color: #f44336 !important;
  box-shadow: 0 4px 16px rgba(244, 67, 54, 0.3) !important;
}

.option-disabled {
  border-color: #e0e0e0 !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05) !important;
}

.rounded-borders {
  border-radius: 12px;
}

@media (max-width: 600px) {
  .col-sm-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
