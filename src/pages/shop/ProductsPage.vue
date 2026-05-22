<template>
  <q-page padding>
    <div class="text-h5 text-weight-bold q-mb-lg">Products</div>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.id">
        <q-card class="product-card">
          <img :src="product.image" height="220" />

          <q-card-section>
            <div class="text-subtitle1 text-weight-bold">
              {{ product.name }}
            </div>

            <div class="text-grey">${{ product.price }}</div>
          </q-card-section>

          <q-card-actions align="between">
            <q-btn flat color="primary" label="View" />

            <q-btn color="primary" icon="shopping_cart" label="Add" @click="addToCart(product)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCartStore } from 'src/stores/cart'

const cart = useCartStore()

const products = [
  {
    id: 1,
    name: 'Gaming Mouse',
    price: 120,
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 250,
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
  },
  {
    id: 3,
    name: 'Monitor',
    price: 450,
    image: 'https://cdn.quasar.dev/img/quasar.jpg',
  },
  {
    id: 4,
    name: 'Headphone',
    price: 180,
    image: 'https://cdn.quasar.dev/img/parallax1.jpg',
  },
]

function addToCart(product) {
  cart.addToCart(product)

  alert(`${product.name} added to cart`)
}
</script>

<style scoped>
.product-card {
  border-radius: 18px;
  transition: 0.3s;
}

.product-card:hover {
  transform: translateY(-6px);
}
</style>
