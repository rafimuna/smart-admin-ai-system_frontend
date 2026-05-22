<template>
  <q-page padding>
    <div class="text-h5 text-weight-bold q-mb-lg">Checkout</div>

    <div class="row q-col-gutter-lg">
      <!-- LEFT: FORM -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <div class="text-subtitle1 q-mb-md">Shipping Details</div>

          <q-input v-model="form.name" label="Full Name" outlined class="q-mb-md" />
          <q-input v-model="form.address" label="Address" outlined class="q-mb-md" />
          <q-input v-model="form.phone" label="Phone" outlined class="q-mb-md" />

          <q-select
            v-model="form.payment"
            :options="['Cash on Delivery', 'Card', 'Mobile Banking']"
            label="Payment Method"
            outlined
          />
        </q-card>
      </div>

      <!-- RIGHT: SUMMARY -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <div class="text-subtitle1 q-mb-md">Order Summary</div>

          <div v-for="item in cart.items" :key="item.id" class="q-mb-sm">
            <div class="row justify-between">
              <div>{{ item.name }} × {{ item.qty }}</div>

              <div>${{ item.price * item.qty }}</div>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <div class="text-h6">Total: ${{ totalPrice }}</div>

          <q-btn
            class="full-width q-mt-md"
            color="primary"
            label="Place Order"
            @click="placeOrder"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useCartStore } from 'src/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const form = reactive({
  name: '',
  address: '',
  phone: '',
  payment: 'Cash on Delivery',
})

const totalPrice = computed(() => {
  return cart.items.reduce((sum, item) => {
    return sum + item.price * item.qty
  }, 0)
})

function placeOrder() {
  if (!form.name || !form.address || !form.phone) {
    alert('Please fill all fields')
    return
  }

  alert('Order placed successfully! 🎉')

  cart.clearCart()

  router.push('/dashboard')
}
</script>
