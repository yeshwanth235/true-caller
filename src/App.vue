<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/Navbar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<style scoped>
</style>
