<template>
  <q-card class="stats-card">
    <q-card-section class="row items-center justify-between">
      <div>
        <div class="text-grey text-subtitle2">
          {{ title }}
        </div>

        <div class="text-h5 text-weight-bold">
          {{ value }}
        </div>
      </div>

      <q-icon :name="icon" size="40px" class="text-primary" />
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  icon: String,
})
</script>

<style scoped>
.stats-card {
  border-radius: 18px;
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
}
</style>
