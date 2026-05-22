import { useAuthStore } from 'src/stores/auth'

export default ({ router }) => {
  router.beforeEach((to) => {
    const authStore = useAuthStore()

    const token = authStore.token

    const publicRoutes = ['/', '/register']
    const isPublic = publicRoutes.includes(to.path)

    // ❌ Not logged in → block dashboard
    if (!token && !isPublic) {
      return '/'
    }

    // ❌ Logged in → block login/register
    if (token && isPublic) {
      return '/dashboard'
    }

    // ✅ allow route
    return true
  })
}
