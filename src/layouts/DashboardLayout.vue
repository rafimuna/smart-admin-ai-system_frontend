<template>
  <q-layout view="hHh Lpr lFf">
    <!-- ================= HEADER ================= -->
    <q-header elevated class="bg-white text-dark shadow-2 glass-header">
      <q-toolbar class="q-px-sm q-px-md-md">
        <!-- MENU BUTTON -->
        <q-btn flat dense round icon="menu" @click="toggleDrawer" />

        <!-- LOGO / BRAND -->
        <div class="row items-center q-ml-sm">
          <q-avatar size="34px">
            <img src="/favicon.ico" />
          </q-avatar>

          <!-- hide text on mobile -->
          <div class="text-subtitle1 text-weight-bold q-ml-sm gt-xs">Ecommerce Admin</div>
        </div>

        <q-space />

        <!-- SEARCH DESKTOP -->
        <q-input dense outlined rounded placeholder="Search..." class="search-input gt-sm">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- MOBILE SEARCH -->
        <q-btn flat dense round icon="search" class="lt-md q-ml-xs" />

        <!-- VOICE AGENT -->
        <div class="q-ml-xs">
          <VoiceAgent />
        </div>

        <!-- DARK MODE -->
        <q-btn flat dense round icon="dark_mode" class="q-ml-xs" @click="toggleDarkMode" />

        <!-- NOTIFICATIONS -->
        <q-btn flat dense round icon="notifications" class="q-ml-xs">
          <q-badge color="red" floating> 3 </q-badge>
        </q-btn>

        <!-- USER MENU -->
        <q-btn flat round dense class="q-ml-xs">
          <q-avatar size="34px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <q-menu>
            <q-list style="min-width: 180px">
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section> Profile </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>

                <q-item-section> Settings </q-item-section>
              </q-item>

              <q-separator />

              <!-- LOGOUT -->
              <q-item clickable @click="handleLogout">
                <q-item-section avatar>
                  <q-icon name="logout" color="negative" />
                </q-item-section>

                <q-item-section class="text-negative"> Logout </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- ================= SIDEBAR ================= -->
    <q-drawer
      v-model="drawer"
      :mini="miniState"
      show-if-above
      bordered
      :breakpoint="768"
      class="bg-grey-10 text-white"
      :width="260"
    >
      <q-scroll-area class="fit">
        <q-list>
          <!-- COLLAPSE -->
          <q-item clickable @click="miniState = !miniState">
            <q-item-section avatar>
              <q-icon :name="miniState ? 'chevron_right' : 'chevron_left'" />
            </q-item-section>

            <q-item-section v-if="!miniState"> Collapse </q-item-section>
          </q-item>

          <q-separator dark />

          <!-- MENU TITLE -->
          <q-item-label header class="text-grey-4 text-weight-bold"> MAIN MENU </q-item-label>

          <!-- MENU ITEMS -->
          <SidebarItem v-for="item in menuLists" :key="item.title" v-bind="item" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- ================= PAGE ================= -->
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
import VoiceAgent from 'components/ai/VoiceAgent.vue'

/* ================= QUASAR ================= */
const $q = useQuasar()

/* ================= ROUTER ================= */
const router = useRouter()

/* ================= STORE ================= */
const authStore = useAuthStore()

/* ================= STATE ================= */
const drawer = ref(true)
const miniState = ref(false)

/* ================= MENU ================= */
const menuLists = [
  {
    title: 'Dashboard',
    caption: 'Analytics Overview',
    icon: 'dashboard',
    link: '/dashboard',
  },

  {
    title: 'Products',
    caption: 'Manage Products',
    icon: 'inventory_2',
    link: '/dashboard/products',
  },

  {
    title: 'Orders',
    caption: 'Customer Orders',
    icon: 'shopping_cart',
    link: '/dashboard/orders',
  },

  {
    title: 'Users',
    caption: 'Manage Users',
    icon: 'group',
    link: '/dashboard/users',
  },

  {
    title: 'Settings',
    caption: 'Application Settings',
    icon: 'settings',
    link: '/dashboard/settings',
  },
]

/* ================= FUNCTIONS ================= */
function toggleDrawer() {
  drawer.value = !drawer.value
}

function toggleDarkMode() {
  $q.dark.toggle()

  localStorage.setItem('dark', $q.dark.isActive)
}

function handleLogout() {
  authStore.logout()

  router.push('/')
}

/* ================= INIT ================= */
onMounted(() => {
  // restore dark mode
  const savedDark = localStorage.getItem('dark')

  if (savedDark) {
    $q.dark.set(savedDark === 'true')
  }
})
</script>

<style scoped>
/* ================= HEADER ================= */

.glass-header {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.92);
}

/* ================= SEARCH ================= */

.search-input {
  width: 220px;
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .search-input:focus-within {
    width: 280px;
  }
}

/* ================= MOBILE ================= */

@media (max-width: 600px) {
  .search-input {
    width: 100%;
  }
}
</style>
