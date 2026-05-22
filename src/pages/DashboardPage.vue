<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Dashboard</div>
        <div class="text-grey-7 text-caption">Welcome back, manage your business overview</div>
      </div>

      <q-btn color="primary" icon="refresh" label="Refresh" unelevated />
    </div>

    <!-- STATS CARDS -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-3" v-for="card in stats" :key="card.title">
        <q-card class="stats-card q-pa-md shadow-2">
          <div class="row items-center justify-between">
            <div>
              <div class="text-grey-7 text-caption">{{ card.title }}</div>
              <div class="text-h6 text-weight-bold">{{ card.value }}</div>
            </div>

            <q-icon :name="card.icon" size="32px" color="primary" />
          </div>
        </q-card>
      </div>
    </div>

    <!-- CHART + ACTIVITY -->
    <div class="row q-col-gutter-md">
      <!-- CHART -->
      <div class="col-12 col-lg-8">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">Revenue Analytics</div>

          <!-- Placeholder Chart -->
          <div class="chart-box">
            <div class="text-center text-grey-6 q-pa-xl">
              📊 Chart will be here (ApexCharts / Chart.js)
            </div>
          </div>
        </q-card>
      </div>

      <!-- ACTIVITY -->
      <div class="col-12 col-lg-4">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">Recent Activity</div>

          <q-list>
            <q-item v-for="(item, i) in activity" :key="i">
              <q-item-section avatar>
                <q-icon name="notifications" color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label caption>{{ item.time }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- TABLE -->
    <div class="q-mt-lg">
      <q-card class="q-pa-md shadow-2">
        <div class="text-h6 q-mb-md">Recent Orders</div>

        <q-table flat :rows="orders" :columns="columns" row-key="id" />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

/* ---------------- STATS ---------------- */
const stats = ref([
  { title: 'Revenue', value: '$12,500', icon: 'payments' },
  { title: 'Orders', value: '1,240', icon: 'shopping_cart' },
  { title: 'Users', value: '845', icon: 'group' },
  { title: 'Products', value: '320', icon: 'inventory' },
])

/* ---------------- ACTIVITY ---------------- */
const activity = ref([
  { title: 'New order received', time: '2 min ago' },
  { title: 'Product added', time: '10 min ago' },
  { title: 'User registered', time: '1 hour ago' },
])

/* ---------------- TABLE ---------------- */
const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'customer', label: 'Customer', field: 'customer' },
  { name: 'amount', label: 'Amount', field: 'amount' },
  { name: 'status', label: 'Status', field: 'status' },
]

const orders = ref([
  { id: 1, customer: 'John', amount: '$120', status: 'Paid' },
  { id: 2, customer: 'Sarah', amount: '$80', status: 'Pending' },
  { id: 3, customer: 'Alex', amount: '$200', status: 'Shipped' },
])

/* ---------------- ANIMATION ---------------- */
onMounted(() => {
  gsap.from('.stats-card', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
  })
})
</script>

<style scoped>
.stats-card {
  border-radius: 14px;
  transition: 0.3s;
}

.stats-card:hover {
  transform: translateY(-4px);
}

.chart-box {
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  border-radius: 12px;
}
</style>
