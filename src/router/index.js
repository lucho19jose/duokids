import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { store } from '../store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // Navigation guard for authentication
  Router.beforeEach((to, from, next) => {
    // Initialize store on first navigation
    if (!store.lessons.length) {
      store.init()
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    
    if (requiresAuth && !store.isAuthenticated) {
      // If route requires auth and user is not authenticated, redirect to login
      next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && store.isAuthenticated) {
      // If user is authenticated and tries to visit login/register, redirect them to home
      next('/')
    } else {
      // Otherwise, allow navigation
      next()
    }
  })

  return Router
})
