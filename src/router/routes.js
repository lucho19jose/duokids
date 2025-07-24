const routes = [
  // Authentication routes
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterPage.vue') }
    ]
  },
  
  // Main app routes (require authentication)
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: '/quiz/:lessonId', 
        component: () => import('pages/QuizPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: '/success/:lessonId', 
        component: () => import('pages/SuccessPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: '/profile', 
        component: () => import('pages/ProfilePage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
