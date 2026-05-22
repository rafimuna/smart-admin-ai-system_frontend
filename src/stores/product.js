import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),

  getters: {
    totalProducts: (state) => state.products.length,
  },

  actions: {
    /* ---------------- ADD ---------------- */
    addProduct(product) {
      this.products.push({
        ...product,
        id: Date.now(),
      })
    },

    /* ---------------- UPDATE ---------------- */
    updateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id)

      if (index !== -1) {
        this.products[index] = updatedProduct
      }
    },

    /* ---------------- DELETE ---------------- */
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id)
    },
  },
})
