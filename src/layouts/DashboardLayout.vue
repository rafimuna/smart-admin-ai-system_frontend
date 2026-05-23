<template>
  <q-layout view="hHh Lpr lFf">
    <!-- ================= HEADER ================= -->
    <q-header elevated class="bg-white text-dark shadow-2">
      <q-toolbar class="q-px-md">
        <!-- MENU -->
        <q-btn flat dense round icon="menu" @click="toggleDrawer" />

        <!-- LOGO -->
        <div class="row items-center q-ml-sm">
          <!-- hide text on mobile -->
          <div class="text-subtitle1 text-weight-bold q-ml-sm gt-xs">Ecommerce Admin</div>
        </div>

        <q-space />

        <!-- SEARCH -->
        <q-input dense outlined rounded placeholder="Search..." class="search-input gt-sm">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- MOBILE SEARCH -->
        <q-btn flat round icon="search" class="lt-md" />

        <!-- VOICE -->
        <VoiceAgent class="q-ml-sm gt-xs" />

        <!-- DARK MODE -->
        <q-btn flat round icon="dark_mode" @click="toggleDarkMode" />

        <!-- NOTIFICATIONS -->
        <q-btn flat round icon="notifications">
          <q-badge color="red" floating> 3 </q-badge>
        </q-btn>

        <!-- USER -->
        <q-btn flat round class="q-ml-sm">
          <q-avatar size="34px">
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

              <q-item clickable @click="handleLogout">
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
      class="bg-grey-10 text-white"
      :width="260"
    >
      <q-list>
        <!-- collapse button -->
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

const $q = useQuasar()
const router = useRouter()
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
    link: '/admin/dashboard',
  },
  { title: 'Products', caption: 'Manage Products', icon: 'inventory', link: '/admin/products' },
  { title: 'Users', caption: 'Manage Users', icon: 'group', link: '/admin/users' },
  { title: 'Orders', caption: 'Customer Orders', icon: 'shopping_cart', link: '/admin/orders' },
  { title: 'Settings', caption: 'App Settings', icon: 'settings', link: '/admin/settings' },
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
  const saved = localStorage.getItem('dark')
  if (saved) {
    $q.dark.set(saved === 'true')
  }
})
</script>
<style scoped>
.search-input {
  width: 220px;
  transition: all 0.3s ease;
}

.search-input:focus-within {
  width: 280px;
}
</style>
