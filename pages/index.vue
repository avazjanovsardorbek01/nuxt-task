<template>
  <div class="container">
    <div class="app">
      <Navbar />
      <div class="main-content">
        <div class="container">
          <ClientOnly>
            <Slider />
          </ClientOnly>

          <ClientOnly>
            <AdvantageList />
          </ClientOnly>

          <ClientOnly>
            <ProjectList />
          </ClientOnly>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/app-navbar.vue";
import Slider from "../pages/swiper/Slider.vue";
import AdvantageList from "./advantage/Advantage.vue";
import ProjectList from "./project/Project.vue";
import Footer from "../components/app-footer.vue";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #02041f;
  color: white;
  font-family: "Gilroy", sans-serif;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
}
html {
  scroll-behavior: smooth;
}
</style>
