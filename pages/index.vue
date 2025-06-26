<template>
  <div class="app">
    <AppNavbar />
    <div class="main-content">
      <div class="container">
        <ClientOnly>
          <Slider />
        </ClientOnly>
        <AdvantageList />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from "../components/common/app-navbar.vue";
import Slider from "~/components/swiper/Slider.vue";
import AdvantageList from "../components/AdvantageList.vue";
</script>

<style>
/* Глобальные стили */
body {
  margin: 0;
  padding: 0;
  background-color: #02041f;
  color: white;
  font-family: "Gilroy", sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* ✅ Контейнер для центрирования и ограничения ширины */
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
  width: 100%;
}
</style>
