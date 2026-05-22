<template>
  <q-card class="q-pa-md rounded-borders">
    <div class="text-h6 text-weight-bold q-mb-md">Recent Orders</div>

    <q-table flat bordered :rows="rows" :columns="columns" row-key="id" />
  </q-card>
</template>

<script setup>
const columns = [
  {
    name: 'customer',
    label: 'Customer',
    field: 'customer',
    align: 'left',
  },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
  },
]

const rows = [
  {
    id: 1,
    customer: 'John Doe',
    amount: '$120',
    status: 'Completed',
  },
  {
    id: 2,
    customer: 'Sarah',
    amount: '$240',
    status: 'Pending',
  },
]
</script>
