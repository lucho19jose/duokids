import { reactive } from 'vue'
import dbData from './db.json'

// Simple reactive store for the app state
export const store = reactive({
  // Authentication State
  isAuthenticated: false,
  currentUser: null, // Will hold the full user object from localStorage
  
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
  init() {
    // Initialize default user if none exists
    this.initializeDefaultUsers()
    
    // Check localStorage for existing session
    const session = localStorage.getItem('duokids_session')
    if (session) {
      const sessionData = JSON.parse(session)
      const users = this.getUsers()
      const user = users.find(u => u.id === sessionData.currentUserId)
      
      if (user) {
        this.isAuthenticated = true
        this.currentUser = user
        this.completedLessons = user.progress.completedLessons
        this.score = user.progress.totalPoints
      }
    }
  },

  initializeDefaultUsers() {
    const existingUsers = localStorage.getItem('duokids_users')
    if (!existingUsers) {
      const defaultUsers = [
        {
          id: 1,
          username: "Leo",
          email: "user@test.com",
          password: "password123",
          progress: {
            totalPoints: 0,
            completedLessons: []
          }
        }
      ]
      localStorage.setItem('duokids_users', JSON.stringify(defaultUsers))
    }
  },

  getUsers() {
    const users = localStorage.getItem('duokids_users')
    return users ? JSON.parse(users) : []
  },

  saveUsers(users) {
    localStorage.setItem('duokids_users', JSON.stringify(users))
  },

  login(email, password) {
    const users = this.getUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      // Set session
      localStorage.setItem('duokids_session', JSON.stringify({ currentUserId: user.id }))
      
      // Update state
      this.isAuthenticated = true
      this.currentUser = user
      this.completedLessons = user.progress.completedLessons
      this.score = user.progress.totalPoints
      
      return true
    }
    
    return false
  },

  register(username, email, password) {
    const users = this.getUsers()
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return false
    }
    
    // Create new user
    const newUser = {
      id: Date.now(), // Simple ID generation
      username,
      email,
      password,
      progress: {
        totalPoints: 0,
        completedLessons: []
      }
    }
    
    users.push(newUser)
    this.saveUsers(users)
    
    // Automatically log them in
    this.login(email, password)
    
    return true
  },

  logout() {
    localStorage.removeItem('duokids_session')
    this.isAuthenticated = false
    this.currentUser = null
    this.completedLessons = []
    this.score = 0
  },

  updateUserProgress() {
    if (!this.currentUser) return
    
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === this.currentUser.id)
    
    if (userIndex !== -1) {
      users[userIndex].progress.completedLessons = this.completedLessons
      users[userIndex].progress.totalPoints = this.score
      this.saveUsers(users)
      
      // Update current user object
      this.currentUser.progress.completedLessons = this.completedLessons
      this.currentUser.progress.totalPoints = this.score
    }
  },
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
  
  completeLesson(lessonId, points = 100) {
    const targetLessonId = lessonId || this.currentLessonId
    if (targetLessonId && !this.completedLessons.includes(targetLessonId)) {
      this.completedLessons.push(targetLessonId)
      this.score += points
      this.updateUserProgress()
    }
    if (lessonId === this.currentLessonId) {
      this.currentLessonId = null
      this.currentQuestionIndex = 0
    }
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
