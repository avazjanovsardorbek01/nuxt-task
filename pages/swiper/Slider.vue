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
        @slideChange="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="slide-content">
            <div
              class="text-container"
              :class="{
                'animate__animated animate__fadeInLeft': activeIndex === index,
              }"
            >
              <h2>{{ slide.title }}</h2>
              <p class="slide-desc">{{ slide.description }}</p>
              <NuxtLink to="/catalog" class="catalog-btn">
                Перейти в каталог
              </NuxtLink>
            </div>
            <div
              class="image-container"
              :class="{
                'animate__animated animate__fadeInRight': activeIndex === index,
              }"
            >
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
import "animate.css";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides = ref<Slide[]>([]);
const activeIndex = ref(0);
let swiperInstance: any = null;

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
          "Установка полной биологической очистки предназначена для глубокой биологической очистки хозяйственно-бытовых и близких к ним по составу производственных сточных вод.",
        image: "/default-slide.jpg",
      },
    ];
  }
});

const onSwiper = (swiper: any) => {
  swiperInstance = swiper;
  activeIndex.value = swiper.realIndex;
};

const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.realIndex;
};
</script>

<style scoped>
.slider-section {
  width: 100%;
  background-color: #02041f;
  padding: 23px 0;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
}

.my-swiper {
  width: 100%;
  height: 650px;
}

.slide-content {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 60px;
}

.text-container {
  flex: 1;
  max-width: 700px;
  color: white;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s ease-out;
}

.text-container.animate__fadeInLeft {
  opacity: 1;
  transform: translateX(0);
}

.text-container h2 {
  font-size: 2.8rem;
  font-weight: 500;
  margin-bottom: 30px;
  line-height: 1.3;
  text-transform: uppercase;
}

.text-container p {
  font-size: 1.3rem;
  line-height: 1.7;
  margin-bottom: 40px;
}

.image-container {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.6s ease-out 0.2s;
}

.image-container.animate__fadeInRight {
  opacity: 1;
  transform: translateX(0);
}

.slide-image {
  max-height: 90%;
  max-width: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.slide-image:hover {
  transform: scale(1.03);
}

.slide-desc {
  font-family: "Gilroy-Light";
}

.catalog-btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 16px 40px;
  text-decoration: none;
  border-radius: 6px;
  font-family: "Gilroy-Light";

  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.catalog-btn:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 650px;
  color: white;
  font-size: 1.5rem;
}

/* Пагинация (точки) под слайдером */
::v-deep(.swiper-pagination) {
  bottom: 0px !important;
  text-align: center;
}

::v-deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.6;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  transition: all 0.3s ease;
  border-radius: 50%;
}

::v-deep(.swiper-pagination-bullet-active) {
  background-color: #1078d7;
  opacity: 1;
  width: 12px;
  height: 12px;
}

/* Общие стили */
.slider-section {
  width: 100%;
  background-color: #02041f;
  padding: 23px 0;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
}

.my-swiper {
  width: 100%;
  height: 650px;
}

.slide-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  height: 100%;
}

.text-container {
  flex: 1;
  color: white;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s ease-out;
}

.text-container.animate__fadeInLeft {
  opacity: 1;
  transform: translateX(0);
}

.text-container h2 {
  font-size: 2.8rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 30px;
  text-transform: uppercase;
}

.text-container p {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 40px;
}

.catalog-btn {
  display: inline-block;
  background-color: #1078d7;
  color: #fff;
  padding: 14px 32px;
  font-size: 1.1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.6s ease-out 0.2s;
}

.image-container.animate__fadeInRight {
  opacity: 1;
  transform: translateX(0);
}

.slide-image {
  max-width: 100%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 650px;
  color: white;
  font-size: 1.5rem;
}

/* Пагинация */
::v-deep(.swiper-pagination) {
  bottom: 0px !important;
  text-align: center;
}

::v-deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.6;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  transition: 0.3s;
}

::v-deep(.swiper-pagination-bullet-active) {
  background-color: #1078d7;
  opacity: 1;
  width: 12px;
  height: 12px;
}

/* Адаптивность */
@media (max-width: 1200px) {
  .text-container h2 {
    font-size: 2.4rem;
  }

  .text-container p {
    font-size: 1.1rem;
  }

  .catalog-btn {
    padding: 12px 28px;
    font-size: 1rem;
  }

  .slide-content {
    gap: 40px;
  }
}

@media (max-width: 991px) {
  .my-swiper {
    height: 600px;
  }

  .slide-content {
    flex-direction: column;
    gap: 30px;
    justify-content: center;
  }

  .text-container,
  .image-container {
    width: 100%;
    text-align: center;
    transform: none !important;
    opacity: 1 !important;
  }

  .text-container h2 {
    font-size: 2rem;
  }

  .text-container p {
    font-size: 1rem;
  }

  .slide-image {
    max-height: 300px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .catalog-btn {
    padding: 10px 24px;
    font-size: 0.95rem;
  }

  .slide-content {
    gap: 20px;
    height: 620px;
  }

  .text-container h2 {
    font-size: 1.6rem;
  }

  .text-container p {
    font-size: 0.95rem;
  }
}

@media (max-width: 375px) {
  .my-swiper {
    height: 720px;
  }

  .text-container h2 {
    font-size: 1.3rem;
  }

  .text-container p {
    font-size: 0.9rem;
  }

  .catalog-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .slide-image {
    max-height: 250px;
  }
}
</style>
