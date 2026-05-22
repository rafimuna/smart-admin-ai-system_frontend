import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    login(userData) {
      this.user = userData
      this.token = 'fake-jwt-token'

      // ✅ persist in localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', this.token)
    },

    logout() {
      this.user = null
      this.token = null

      // ✅ clear storage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
