<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="auth-container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fb;
}
</style>
