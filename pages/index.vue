<template>
  <appNavbar />
  <ClientOnly>
    <Slider />
  </ClientOnly>
  <AdvantageList />
</template>

<script setup>
import Slider from "../components/swiper/Slider.vue";
import AdvantageList from "~/components/AdvantageList.vue";
import appNavbar from "~/components/common/app-navbar.vue";
</script>
