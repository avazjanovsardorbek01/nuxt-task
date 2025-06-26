<template>
  <div v-if="slides.length" class="slider-section">
    <div class="container">
      <Swiper
        :modules="[Autoplay, Pagination, Navigation]"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="false"
        class="my-swiper"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="slide-content">
            <div class="text-container">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
              <NuxtLink to="/catalog" class="catalog-btn"
                >Перейти в каталог</NuxtLink
              >
            </div>
            <div class="image-container">
              <img :src="slide.image" :alt="slide.title" class="slide-image" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div v-else class="loading container">Загрузка слайдов...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides = ref<Slide[]>([]);

onMounted(async () => {
  try {
    const { data, error } = await useFetch(
      "https://api.los-bio.ru/info/group/slide"
    );

    if (error.value) throw error.value;

    if (data.value) {
      slides.value = data.value.map((item: any) => {
        const parsedData = JSON.parse(item.value);
        const imageObj = parsedData?.image?.[0];

        return {
          title: parsedData.title || "Станции биологической очистки ЛОС-Р",
          description:
            parsedData.description ||
            "Установка полной биологической очистки...",
          image: imageObj
            ? `https://api.los-bio.ru/files/${imageObj.catalog}/${imageObj.name}`
            : "/default-slide.jpg",
        };
      });
    }
  } catch (error) {
    console.error("Ошибка загрузки слайдов:", error);
    slides.value = [
      {
        title: "Станции биологической очистки ЛОС-Р",
        description:
          "Установка полной биологической очистки предназначена для глубокой биологической очистки...",
        image: "/default-slide.jpg",
      },
    ];
  }
});
</script>

<style scoped>
.slider-section {
  width: 100%;
  background-color: #02041f;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.my-swiper {
  width: 100%;
  height: 500px;
}

.slide-content {
  display: flex;
  height: 100%;
  align-items: center;
}

.text-container {
  flex: 1;
  max-width: 600px;
  color: white;
  padding-right: 40px;
}

.text-container h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  text-transform: uppercase;
}

.text-container p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.image-container {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-image {
  max-height: 80%;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.catalog-btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: 0.3s;
}

.catalog-btn:hover {
  background-color: #0056b3;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  color: white;
}

@media (max-width: 992px) {
  .slide-content {
    flex-direction: column;
    text-align: center;
  }

  .text-container {
    padding-right: 0;
    margin-bottom: 30px;
  }

  .image-container {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 576px) {
  .my-swiper {
    height: auto;
    min-height: 500px;
  }

  .text-container h2 {
    font-size: 1.5rem;
  }
}
</style>
