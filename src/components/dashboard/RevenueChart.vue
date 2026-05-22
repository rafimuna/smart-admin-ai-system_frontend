<template>
  <q-card class="q-pa-md rounded-borders">
    <div class="text-h6 text-weight-bold q-mb-md">Revenue Overview</div>

    <ApexChart type="line" height="350" :options="chartOptions" :series="series" />
  </q-card>
</template>

<script setup>
const series = [
  {
    name: 'Revenue',
    data: [1200, 2100, 1800, 3200, 4100, 5000],
  },
]

const chartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },

  stroke: {
    curve: 'smooth',
  },

  dataLabels: {
    enabled: false,
  },

  colors: ['#1976D2'],

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },

  grid: {
    borderColor: '#f1f1f1',
  },
}
</script>
