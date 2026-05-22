import { defineStore } from 'pinia'
import { fetchAIInsight } from 'src/services/aiService'

export const useAiStore = defineStore('ai', {
  state: () => ({
    loading: false,

    // always keep default object (NEVER null)
    insight: {
      message: '',
      confidence: 0,
    },

    error: null,
  }),

  getters: {
    // safe access (extra protection)
    insightMessage: (state) => state.insight?.message || 'No insight yet',
    insightConfidence: (state) => state.insight?.confidence || 0,
  },

  actions: {
    // -----------------------------
    // FETCH AI INSIGHT
    // -----------------------------
    async fetchInsight() {
      this.loading = true
      this.error = null

      try {
        const data = await fetchAIInsight()

        // validate response (important for production)
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid AI response')
        }

        this.insight = {
          message: data.message || 'No message returned',
          confidence: data.confidence ?? 0,
        }
      } catch (err) {
        console.error('AI fetch error:', err)

        this.error = err?.message || 'Something went wrong'

        // fallback state (prevents UI crash)
        this.insight = {
          message: 'Unable to generate insight',
          confidence: 0,
        }
      } finally {
        this.loading = false
      }
    },

    // -----------------------------
    // RESET STATE
    // -----------------------------
    resetInsight() {
      this.insight = {
        message: '',
        confidence: 0,
      }
      this.error = null
    },
  },
})
