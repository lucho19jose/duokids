import { reactive } from 'vue'
import dbData from './db.json'

// Simple reactive store for the app state
export const store = reactive({
  // App data
  subject: dbData.subject,
  lessons: dbData.lessons,
  
  // User progress
  currentLessonId: null,
  currentQuestionIndex: 0,
  score: 0,
  completedLessons: [],
  
  // Quiz state
  selectedAnswer: null,
  showFeedback: false,
  isAnswerCorrect: false,
  
  // Methods
  startLesson(lessonId) {
    this.currentLessonId = lessonId
    this.currentQuestionIndex = 0
    this.selectedAnswer = null
    this.showFeedback = false
    this.isAnswerCorrect = false
  },
  
  selectAnswer(option) {
    this.selectedAnswer = option
    this.isAnswerCorrect = option.isCorrect
    this.showFeedback = true
    
    if (option.isCorrect) {
      this.score += 10
    }
  },
  
  nextQuestion() {
    this.currentQuestionIndex++
    this.selectedAnswer = null
    this.showFeedback = false
    this.isAnswerCorrect = false
  },
  
  completeLesson() {
    if (this.currentLessonId && !this.completedLessons.includes(this.currentLessonId)) {
      this.completedLessons.push(this.currentLessonId)
    }
    this.currentLessonId = null
    this.currentQuestionIndex = 0
  },
  
  getCurrentLesson() {
    return this.lessons.find(lesson => lesson.id === this.currentLessonId)
  },
  
  getCurrentQuiz() {
    const lesson = this.getCurrentLesson()
    return lesson ? lesson.quizzes[this.currentQuestionIndex] : null
  },
  
  isLastQuestion() {
    const lesson = this.getCurrentLesson()
    return lesson ? this.currentQuestionIndex === lesson.quizzes.length - 1 : false
  },
  
  getTotalQuestions() {
    const lesson = this.getCurrentLesson()
    return lesson ? lesson.quizzes.length : 0
  },
  
  getProgress() {
    return this.getTotalQuestions() > 0 ? (this.currentQuestionIndex + 1) / this.getTotalQuestions() : 0
  }
})
