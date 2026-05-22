<template>
  <q-page padding>
    <div class="text-h5 text-weight-bold q-mb-lg">Shopping Cart</div>

    <q-card class="q-pa-md">
      <q-list separator>
        <q-item v-for="item in cart.items" :key="item.id">
          <q-item-section avatar>
            <img :src="item.image" width="60" style="border-radius: 10px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ item.name }}
            </q-item-label>

            <q-item-label caption> ${{ item.price }} </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-btn dense flat round icon="remove" @click="decreaseQty(item.id)" />

              <span class="q-mx-sm">
                {{ item.qty }}
              </span>

              <q-btn dense flat round icon="add" @click="increaseQty(item.id)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-my-md" />

      <div class="text-right">
        <div class="text-h6 q-mb-md">Total Items: {{ cart.totalItems }}</div>

        <q-btn color="primary" label="Proceed To Checkout" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { useCartStore } from 'src/stores/cart'

const cart = useCartStore()

function increaseQty(id) {
  const item = cart.items.find((i) => i.id === id)

  if (item) {
    item.qty++
  }
}

function decreaseQty(id) {
  const item = cart.items.find((i) => i.id === id)

  if (item && item.qty > 1) {
    item.qty--
  }
}
</script>
