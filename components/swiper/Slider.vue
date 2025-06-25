<template>
  <div v-if="slides.length" class="slider-container">
    <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="my-swiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-[70vh] object-cover"
        />
        <div class="absolute bottom-10 left-10 text-white">
          <h2 class="text-3xl font-bold">{{ slide.title }}</h2>
          <p class="mt-2">{{ slide.description }}</p>
        </div>
      </SwiperSlide>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = ref([]);

onMounted(async () => {
  const { data } = await useFetch("https://api.los-bio.ru/info/group/slide");

  if (data.value) {
    slides.value = data.value.map((item) => {
      const parsed = JSON.parse(item.value);
      return {
        title: parsed.title,
        description: parsed.description,
        image: `https://api.los-bio.ru/media/${parsed.image[0].catalog}/${parsed.image[0].name}`,
      };
    });
    console.log("Slides loaded:", slides.value);
  }
});
</script>

<style scoped>
.slider-container {
  position: relative;
}

.my-swiper {
  width: 100%;
  height: 70vh;
}

.swiper-button-prev,
.swiper-button-next {
  color: white;
}
</style>
