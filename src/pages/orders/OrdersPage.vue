<template>
  <q-page padding>
    <!-- PAGE HEADER -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h4 text-weight-bold">Order Management</div>

        <div class="text-grey">Manage customer orders</div>
      </div>
    </div>

    <!-- ORDER TABLE -->
    <q-card flat bordered>
      <q-table title="Recent Orders" :rows="orders" :columns="columns" row-key="id" flat>
        <!-- STATUS -->
        <template v-slot:body-cell-status="props">
          <q-td>
            <q-badge :color="getStatusColor(props.row.status)">
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <!-- ACTIONS -->
        <template v-slot:body-cell-actions>
          <q-td>
            <q-btn flat round dense color="primary" icon="visibility" />

            <q-btn flat round dense color="negative" icon="delete" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
/* -----------------------
   TABLE COLUMNS
------------------------*/
const columns = [
  {
    name: 'id',
    label: 'Order ID',
    field: 'id',
    align: 'left',
  },

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
    align: 'left',
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
  },

  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
  },
]

/* -----------------------
   DUMMY ORDERS
------------------------*/
const orders = [
  {
    id: '#1001',
    customer: 'John Doe',
    amount: '$250',
    status: 'Pending',
  },

  {
    id: '#1002',
    customer: 'Alex Smith',
    amount: '$540',
    status: 'Completed',
  },

  {
    id: '#1003',
    customer: 'Sarah',
    amount: '$120',
    status: 'Cancelled',
  },
]

/* -----------------------
   STATUS COLORS
------------------------*/
function getStatusColor(status) {
  if (status === 'Completed') {
    return 'positive'
  }

  if (status === 'Pending') {
    return 'warning'
  }

  if (status === 'Cancelled') {
    return 'negative'
  }

  return 'grey'
}
</script>
