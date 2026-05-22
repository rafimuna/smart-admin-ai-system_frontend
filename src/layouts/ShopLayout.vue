<template>
  <q-layout view="hHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated class="bg-white text-dark shadow-3">
      <q-toolbar>
        <!-- Logo -->
        <q-toolbar-title class="text-weight-bold"> 🛒 ShopVerse </q-toolbar-title>

        <q-space />

        <!-- Search -->
        <q-input
          dense
          outlined
          placeholder="Search products..."
          style="width: 250px"
          class="q-mr-md"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Cart -->
        <q-btn flat round icon="shopping_cart" to="/shop/cart">
          <q-badge v-if="cart.totalItems > 0" color="red" floating>
            {{ cart.totalItems }}
          </q-badge>
        </q-btn>

        <!-- Login / Profile -->
        <q-btn flat round icon="person">
          <q-menu>
            <q-list style="min-width: 180px">
              <q-item clickable>
                <q-item-section>My Profile</q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section>My Orders</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable @click="logout">
                <q-item-section class="text-negative"> Logout </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- PAGE CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useCartStore } from 'src/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>
