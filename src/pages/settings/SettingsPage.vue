<template>
  <q-page padding>
    <!-- PAGE HEADER -->
    <div class="q-mb-lg">
      <div class="text-h4 text-weight-bold">Settings</div>

      <div class="text-grey">Manage application settings</div>
    </div>

    <!-- SETTINGS CARD -->
    <div class="row q-col-gutter-lg">
      <!-- PROFILE -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="q-pa-lg">
          <div class="text-h6 q-mb-md">Profile Settings</div>

          <q-input outlined label="Full Name" class="q-mb-md" />

          <q-input outlined label="Email" class="q-mb-md" />

          <q-btn color="primary" label="Save Changes" />
        </q-card>
      </div>

      <!-- APP SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="q-pa-lg">
          <div class="text-h6 q-mb-md">App Settings</div>

          <!-- DARK MODE -->
          <q-toggle v-model="darkMode" label="Dark Mode" class="q-mb-md" />

          <!-- NOTIFICATIONS -->
          <q-toggle v-model="notifications" label="Enable Notifications" class="q-mb-md" />

          <q-btn color="positive" label="Update Settings" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const darkMode = ref(false)

const notifications = ref(true)
</script>
