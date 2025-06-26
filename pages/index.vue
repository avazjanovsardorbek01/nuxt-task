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
import Navbar from "../components/common/app-navbar.vue";
import Slider from "../pages/swiper/Slider.vue";
import AdvantageList from "./Advantage.vue";
import ProjectList from "./Project.vue"; // ✅ Обновлённое имя
import Footer from "../components/common/app-footer.vue";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #02041f;
  color: white;
  font-family: "Gilroy", sans-serif;
}

/* .app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
} */

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  /* width: auto; */
}
</style>
