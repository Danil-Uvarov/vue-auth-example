import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { RouteNames } from '@/models/RouteNames'
import { useAuthStore } from '@/stores/auth'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Login,
    component: () => import('../components/login.vue'),
    meta: {
      layout: 'login',
    },
  },
  {
    path: '/header',
    name: RouteNames.Home,
    component: () => import('../components/TheHeader.vue'),
    meta: {
      layout: 'header',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const whiteList: string[] = [RouteNames.Login]

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()

  if (authStore.accessToken) {
    if (to.name === RouteNames.Login) {
      next({ name: RouteNames.Home })
    } else {
      if (!authStore.me?.role?.id) {
        try {
          await authStore.getUserMe()

          next({ ...to })
        } catch (error) {
          authStore.resetToken()
          next({ name: RouteNames.Login })
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.name as string) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next({ name: RouteNames.Login, query: { redirect: to.path } })
    }
  }
  return
})

export default router
