<template>
  <q-page padding>
    <!-- Stats -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12 col-md-3" v-for="card in statsCards" :key="card.title">
        <StatsCard v-bind="card" />
      </div>
    </div>
    <!-- 🚀 AI INSIGHT SECTION (ADD HERE) -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12 col-md-4">
        <AiInsightCard />
      </div>
    </div>
    <!-- Charts -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-8">
        <RevenueChart />
      </div>

      <div class="col-12 col-lg-4">
        <ActivityTimeline />
      </div>
    </div>

    <!-- Orders -->
    <div class="q-mt-lg">
      <RecentOrders />
    </div>
  </q-page>
</template>

<script setup>
import StatsCard from 'components/dashboard/StatsCard.vue'
import RevenueChart from 'components/dashboard/RevenueChart.vue'
import RecentOrders from 'components/dashboard/RecentOrders.vue'
import ActivityTimeline from 'components/dashboard/ActivityTimeline.vue'
import AiInsightCard from 'components/dashboard/AiInsightCard.vue'

const statsCards = [
  {
    title: 'Revenue',
    value: '$12,500',
    icon: 'payments',
  },
  {
    title: 'Orders',
    value: '1,240',
    icon: 'shopping_cart',
  },
  {
    title: 'Users',
    value: '845',
    icon: 'group',
  },
  {
    title: 'Growth',
    value: '+18%',
    icon: 'trending_up',
  },
]

import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from('.stats-card', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  })
})
</script>
