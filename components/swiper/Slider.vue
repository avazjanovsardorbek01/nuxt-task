<template>
  <div v-if="slides.length" class="slider-container">
    <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :loop="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="my-swiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="slide-content">
          <img :src="slide.image" :alt="slide.title" class="slide-image" />
          <div class="slide-text">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = ref<
  {
    title: string;
    description: string;
    image: string;
  }[]
>([]);

onMounted(async () => {
  try {
    const { data } = await useFetch("https://api.los-bio.ru/info/group/slide");

    if (data.value) {
      slides.value = data.value.map((item: any) => {
        const parsed = JSON.parse(item.value);
        const imageObj = parsed?.image?.[0];

        const imageUrl =
          imageObj && imageObj.catalog && imageObj.name
            ? `https://api.los-bio.ru/files/${imageObj.catalog}/${imageObj.name}`
            : "";

        return {
          title: parsed.title || "",
          description: parsed.description || "",
          image: imageUrl,
        };
      });

      console.log("Slides:", slides.value);
    }
  } catch (error) {
    console.error("Ошибка при загрузке слайдов:", error);
  }
});
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.my-swiper {
  width: 100%;
  height: 100%;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-text {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
}
</style>
