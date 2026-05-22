<template>
  <q-layout view="hHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated class="bg-white text-dark shadow-3">
      <q-toolbar>
        <!-- Sidebar toggle -->
        <q-btn flat dense round icon="menu" @click="toggleDrawer" />

        <q-toolbar-title class="text-weight-bold"> Ecommerce Admin </q-toolbar-title>

        <q-space />

        <!-- Search -->
        <q-input dense outlined placeholder="Search..." style="width: 220px">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <!-- CART -->
        <q-btn flat round icon="shopping_cart" to="/dashboard/cart">
          <q-badge color="orange" floating v-if="cart.totalItems > 0">
            {{ cart.totalItems }}
          </q-badge>
        </q-btn>
        <!-- Dark mode -->
        <q-btn flat round icon="dark_mode" @click="toggleDarkMode" />

        <!-- Notifications -->
        <q-btn flat round icon="notifications">
          <q-badge color="red" floating>3</q-badge>
        </q-btn>

        <!-- USER MENU -->
        <q-btn flat round>
          <q-avatar size="32px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <q-menu>
            <q-list style="min-width: 180px">
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section>Settings</q-item-section>
              </q-item>

              <q-separator />

              <!-- 🔥 LOGOUT -->
              <q-item clickable @click="handleLogout">
                <q-item-section class="text-negative"> Logout </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- SIDEBAR -->
    <q-drawer
      v-model="drawer"
      :mini="miniState"
      show-if-above
      bordered
      class="bg-grey-10 text-white"
      :width="260"
    >
      <q-list>
        <q-item clickable @click="miniState = !miniState">
          <q-item-section avatar>
            <q-icon name="chevron_left" />
          </q-item-section>

          <q-item-section v-if="!miniState"> Collapse </q-item-section>
        </q-item>

        <q-separator dark />

        <q-item-label header class="text-grey-4 text-weight-bold"> MAIN MENU </q-item-label>

        <SidebarItem v-for="item in menuLists" :key="item.title" v-bind="item" />
      </q-list>
    </q-drawer>

    <!-- PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import SidebarItem from 'components/SidebarItem.vue'
import { useCartStore } from 'src/stores/cart'

const cart = useCartStore()
const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const drawer = ref(true)
const miniState = ref(false)

/* -----------------------
   SIDEBAR
------------------------*/
function toggleDrawer() {
  drawer.value = !drawer.value
}

/* -----------------------
   DARK MODE
------------------------*/
function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('dark', $q.dark.isActive)
}

/* -----------------------
   LOGOUT
------------------------*/
function handleLogout() {
  authStore.logout() // clear store + token

  router.push('/') // go login page
}

/* -----------------------
   MENU
------------------------*/
const menuLists = [
  {
    title: 'Dashboard',
    caption: 'Analytics Overview',
    icon: 'dashboard',
    link: '/admin/dashboard',
  },
  { title: 'Products', caption: 'Manage Products', icon: 'inventory', link: '/admin/products' },
  { title: 'Users', caption: 'Manage Users', icon: 'group', link: '/admin/users' },
  { title: 'Orders', caption: 'Manage Orders', icon: 'shopping_bag', link: '/admin/orders' },
  { title: 'Settings', caption: 'App Settings', icon: 'settings', link: '/admin/settings' },
  {
    title: 'Cart',
    caption: 'Shopping Cart',
    icon: 'shopping_cart',
    link: '/admin/cart',
  },
]

/* -----------------------
   INIT DARK MODE
------------------------*/
onMounted(() => {
  const saved = localStorage.getItem('dark')
  if (saved) {
    $q.dark.set(saved === 'true')
  }
})
</script>
