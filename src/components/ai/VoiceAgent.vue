<template>
  <q-btn round color="primary" icon="mic" :loading="isListening" @click="startListening" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isListening = ref(false)

/* =========================
   SPEAK FUNCTION (AI VOICE)
========================= */
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text)
  speech.lang = 'en-US'
  speech.rate = 1
  speech.pitch = 1
  window.speechSynthesis.speak(speech)
}

/* =========================
   START LISTENING
========================= */
function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    alert('Voice not supported in this browser')
    return
  }

  const recognition = new SpeechRecognition()

  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.interimResults = false

  isListening.value = true
  speak('I am listening')

  recognition.start()

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase()

    console.log('Voice Command:', command)

    handleCommand(command)
  }

  recognition.onerror = () => {
    isListening.value = false
    speak('Something went wrong')
  }

  recognition.onend = () => {
    isListening.value = false
  }
}

/* =========================
   COMMAND SYSTEM
========================= */
function handleCommand(command) {
  // DASHBOARD
  if (command.includes('dashboard')) {
    router.push('/dashboard')
    speak('Opening dashboard')
    return
  }

  // PRODUCTS
  if (command.includes('product')) {
    router.push('/dashboard/products')
    speak('Opening products page')
    return
  }

  // CART
  if (command.includes('cart')) {
    router.push('/dashboard/cart')
    speak('Opening cart')
    return
  }

  // CHECKOUT
  if (command.includes('checkout')) {
    router.push('/dashboard/checkout')
    speak('Opening checkout page')
    return
  }

  // DEFAULT
  speak('Command not recognized')
}
</script>
