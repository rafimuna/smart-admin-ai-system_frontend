<template>
  <div class="register-wrapper">
    <q-card class="register-card q-pa-xl">
      <!-- Title -->
      <div class="text-center q-mb-lg">
        <div class="text-h4 text-weight-bold">Create Account</div>

        <div class="text-grey-7 q-mt-sm">Register to access your dashboard</div>
      </div>

      <!-- Name -->
      <q-input
        v-model="form.name"
        outlined
        label="Full Name"
        class="q-mb-md"
        lazy-rules
        :rules="[(val) => !!val || 'Name is required']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <!-- Email -->
      <q-input
        v-model="form.email"
        outlined
        type="email"
        label="Email Address"
        class="q-mb-md"
        lazy-rules
        :rules="[(val) => !!val || 'Email is required']"
      >
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <!-- Password -->
      <q-input
        v-model="form.password"
        outlined
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        class="q-mb-md"
        lazy-rules
        :rules="[
          (val) => !!val || 'Password is required',
          (val) => val.length >= 6 || 'Minimum 6 characters',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>

        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <!-- Confirm Password -->
      <q-input
        v-model="form.confirmPassword"
        outlined
        :type="isConfirmPwd ? 'password' : 'text'"
        label="Confirm Password"
        class="q-mb-lg"
        lazy-rules
        :rules="[
          (val) => !!val || 'Confirm password is required',
          (val) => val === form.password || 'Passwords do not match',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock_reset" />
        </template>

        <template v-slot:append>
          <q-icon
            :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isConfirmPwd = !isConfirmPwd"
          />
        </template>
      </q-input>

      <!-- Register Button -->
      <q-btn
        label="Create Account"
        color="primary"
        unelevated
        no-caps
        class="full-width register-btn"
        @click="handleRegister"
      />

      <!-- Login Link -->
      <div class="text-center q-mt-lg">
        <span class="text-grey-7"> Already have an account? </span>

        <router-link to="/" class="login-link"> Login </router-link>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Show / Hide password
const isPwd = ref(true)
const isConfirmPwd = ref(true)

// Form state
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Register function
function handleRegister() {
  // Basic validation
  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    $q.notify({
      type: 'negative',
      message: 'Please fill all fields',
    })

    return
  }

  if (form.password !== form.confirmPassword) {
    $q.notify({
      type: 'negative',
      message: 'Passwords do not match',
    })

    return
  }

  // Success notification
  $q.notify({
    type: 'positive',
    message: 'Registration Successful',
  })

  // Redirect login page
  router.push('/')
}
</script>

<style scoped>
.register-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fb;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 430px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.register-btn {
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
}

.login-link {
  margin-left: 6px;
  text-decoration: none;
  color: #1976d2;
  font-weight: 600;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
