<template>
  <div>
    <Navbar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/app-navbar.vue";
import Footer from "~/components/app-footer.vue";
</script>
