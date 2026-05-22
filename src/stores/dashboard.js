import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    loading: false,
    error: null,

    stats: [],
    orders: [],
    activity: [],
  }),

  actions: {
    async fetchDashboard() {
      this.loading = true
      this.error = null

      try {
        // simulate API (later Django/Firebase)
        await new Promise((r) => setTimeout(r, 800))

        this.stats = [
          { title: 'Revenue', value: '$15,200', icon: 'payments' },
          { title: 'Orders', value: '1,520', icon: 'shopping_cart' },
          { title: 'Users', value: '920', icon: 'group' },
          { title: 'Products', value: '410', icon: 'inventory' },
        ]

        this.orders = [
          { id: 1, customer: 'Rahim', amount: '$120', status: 'Paid' },
          { id: 2, customer: 'Karim', amount: '$80', status: 'Pending' },
          { id: 3, customer: 'Jamal', amount: '$250', status: 'Shipped' },
        ]

        this.activity = [
          { title: 'New order placed', time: '2 min ago' },
          { title: 'Product updated', time: '10 min ago' },
          { title: 'New user registered', time: '1 hour ago' },
        ]
      } catch {
        this.error = 'Failed to load dashboard'
      } finally {
        this.loading = false
      }
    },
  },
})
