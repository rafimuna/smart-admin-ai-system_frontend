<template>
  <q-card class="login-card q-pa-xl">
    <div class="text-h5 text-weight-bold q-mb-lg text-center">Login</div>

    <q-input v-model="email" outlined label="Email" class="q-mb-md" />

    <q-input v-model="password" outlined type="password" label="Password" class="q-mb-lg" />
    <div class="text-caption">
      Email: {{ email }} <br />
      Password: {{ password }}
    </div>

    <q-btn label="Login" color="primary" unelevated class="full-width" @click="handleLogin" />
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

// dummy credentials
const demoEmail = 'admin@gmail.com'
const demoPassword = '123456'

function handleLogin() {
  console.log('Email:', email.value)
  console.log('Password:', password.value)

  if (email.value.trim() === demoEmail && password.value.trim() === demoPassword) {
    localStorage.setItem('token', 'demo-token')
    router.push('/admin/dashboard')
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style scoped>
.login-card {
  width: 400px;
  border-radius: 18px;
}
</style>
