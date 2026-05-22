import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.length,
  },

  actions: {
    addToCart(product) {
      const existing = this.items.find((i) => i.id === product.id)

      if (existing) {
        existing.qty++
      } else {
        this.items.push({
          ...product,
          qty: 1,
        })
      }
    },
  },
})
