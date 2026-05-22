<template>
  <q-card class="q-pa-md ai-card shadow-2">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-h6">AI Insights</div>
      <q-icon name="psychology" color="primary" size="28px" />
    </div>

    <div v-if="loading" class="text-grey">Analyzing data...</div>

    <div v-else-if="insight">
      <div class="text-body1 q-mb-sm">📊 {{ insight.message }}</div>

      <div class="text-caption text-grey">Confidence: {{ insight.confidence }}%</div>
    </div>

    <div v-else class="text-grey">No insight available</div>

    <q-btn
      class="q-mt-md"
      color="primary"
      label="Generate Insight"
      dense
      @click="generateInsight"
    />
  </q-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAiStore } from 'src/stores/ai'
import { storeToRefs } from 'pinia'

const ai = useAiStore()
const { insight, loading } = storeToRefs(ai)

function generateInsight() {
  ai.fetchInsight()
}

onMounted(() => {
  ai.fetchInsight()
})
</script>

<style scoped>
.ai-card {
  border-left: 4px solid #1976d2;
  border-radius: 12px;
}
</style>
