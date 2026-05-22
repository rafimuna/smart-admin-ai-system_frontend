export async function fetchAIInsight() {
  // future: replace with real API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Revenue increased 22% due to high demand in electronics 📈',
        confidence: 94,
      })
    }, 1200)
  })
}
