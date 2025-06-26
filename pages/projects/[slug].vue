<template>
  <section class="project-detail" v-if="project">
    <div class="container">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <router-link to="/">Главная</router-link>
        <span class="separator">/</span>
        <router-link to="/projects">Проекты</router-link>
        <span class="separator">/</span>
        <span class="current">{{ project.title }}</span>
      </div>

      <div class="project-layout">
        <!-- Left side - Project info -->
        <div class="project-info-card">
          <h1 class="title">{{ project.title }}</h1>

          <div class="info-section">
            <h3>Работы:</h3>
            <p>{{ project.works }}</p>
          </div>

          <div class="info-section">
            <h3>Оборудование:</h3>
            <p>{{ project.equipment }}</p>
          </div>

          <div class="info-section">
            <h3>Заказчик:</h3>
            <p>{{ project.customer }}</p>
          </div>

          <div
            class="project-description"
            v-html="formatDescription(project.description)"
          ></div>
        </div>

        <!-- Right side - Gallery -->
        <div class="project-gallery-wrapper">
          <div v-if="project.photos?.length" class="project-gallery">
            <div
              v-for="(photo, index) in project.photos"
              :key="index"
              class="gallery-item"
              @click="openModal(index)"
            >
              <img
                :src="getProjectPhotoUrl(photo)"
                :alt="`${project.title} - фото ${index + 1}`"
                class="project-image"
                loading="lazy"
              />
              <div class="image-overlay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  width="36px"
                  height="36px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div v-else class="no-images">Нет изображений проекта</div>
        </div>
      </div>
    </div>

    <!-- Photo Modal -->
    <transition name="fade">
      <div v-if="modalVisible" class="photo-modal" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="36px"
              height="36px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
          <img
            :src="getProjectPhotoUrl(project.photos[currentPhotoIndex])"
            :alt="`${project.title} - фото ${currentPhotoIndex + 1}`"
            class="modal-image"
          />
          <div v-if="project.photos.length > 1" class="modal-nav">
            <button @click.stop="prevPhoto" class="nav-btn prev-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="36px"
                height="36px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              </svg>
            </button>
            <button @click.stop="nextPhoto" class="nav-btn next-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="36px"
                height="36px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const project = ref(null);
const modalVisible = ref(false);
const currentPhotoIndex = ref(0);

const getProjectPhotoUrl = (photo) => {
  if (!photo || !photo.name) return "";
  return photo.name.startsWith("http")
    ? photo.name
    : `https://api.los-bio.ru/files/projects/${photo.name}`;
};

const formatDescription = (description) => {
  if (!description) return "";
  if (typeof description === "string") return description;
  if (description.blocks) {
    return description.blocks
      .map((block) => {
        switch (block.type) {
          case "paragraph":
            return `<p>${block.data.text}</p>`;
          case "header":
            return `<h4>${block.data.text}</h4>`;
          case "list":
            return `<ul>${block.data.items
              .map((item) => `<li>${item}</li>`)
              .join("")}</ul>`;
          default:
            return "";
        }
      })
      .join("");
  }
  return JSON.stringify(description);
};

const openModal = (index) => {
  currentPhotoIndex.value = index;
  modalVisible.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modalVisible.value = false;
  document.body.style.overflow = "auto";
};

const prevPhoto = () => {
  currentPhotoIndex.value =
    (currentPhotoIndex.value - 1 + project.value.photos.length) %
    project.value.photos.length;
};

const nextPhoto = () => {
  currentPhotoIndex.value =
    (currentPhotoIndex.value + 1) % project.value.photos.length;
};

const handleKeyDown = (e) => {
  if (!modalVisible.value) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    prevPhoto();
  } else if (e.key === "ArrowRight") {
    nextPhoto();
  }
};

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.los-bio.ru/projects/${route.params.slug}`
    );
    const data = await res.json();
    project.value = data;
  } catch (error) {
    console.error("Ошибка загрузки проекта:", error);
  }

  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "auto";
});
</script>

<style scoped lang="scss">
.project-detail {
  background-color: #02041f;
  color: #ffffff;
  padding: 80px 0;
  font-family: "Gilroy-Light", sans-serif;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Breadcrumbs */
.breadcrumbs {
  padding: 20px 0;
  margin-bottom: 30px;
  font-size: 14px;
  color: #b0b2c3;
}

.breadcrumbs a {
  color: #00a3e0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs a:hover {
  color: white;
}

.breadcrumbs .separator {
  margin: 0 8px;
  color: #555;
}

.breadcrumbs .current {
  color: white;
}

/* Project Layout */
.project-layout {
  display: flex;
  gap: 40px;
}

.project-info-card {
  width: 691px;
  min-height: 1517px;
  background-color: #0b0d1c;
  border: 1px solid #1e2130;
  padding: 40px;
  border-radius: 16px;
  position: relative;
  animation: fadeInUp 0.8s ease-out;
}

.project-gallery-wrapper {
  flex: 1;
}

.title {
  font-size: 2.5rem;
  font-weight: 100;
  color: white;
  margin-bottom: 2rem;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  font-size: 1.125rem;
  color: #00a3e0;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.info-section p {
  color: #b0b2c3;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.project-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #d0d2e0;
}

.project-description :deep(h4) {
  color: white;
  font-size: 1.125rem;
  margin-top: 1.5rem;
  margin-bottom: 0.625rem;
  font-weight: 500;
}

.project-description :deep(p) {
  margin-bottom: 1rem;
}

.project-description :deep(ul) {
  padding-left: 1.375rem;
  margin-bottom: 1rem;
}

.project-description :deep(li) {
  list-style: disc;
  margin-bottom: 0.375rem;
}

/* Gallery Styles */
.project-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  aspect-ratio: 4/3;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 163, 224, 0.3);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s ease;
}

.gallery-item:hover .project-image {
  filter: brightness(0.7);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.no-images {
  text-align: center;
  color: #888;
  padding: 2.5rem 0;
  font-size: 1rem;
  animation: fadeIn 0.8s ease-out;
}

/* Modal Styles */
.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 163, 224, 0.3);
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.modal-nav {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.nav-btn {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  margin: 0 1rem;
}

.nav-btn:hover {
  background: rgba(0, 163, 224, 0.7);
  transform: scale(1.1);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* >= 1200px (default - katta ekran) */
/* Bu holatda sizning `.container { max-width: 1440px }` ishlaydi */

/* >= 991px va < 1200px */
@media (max-width: 1200px) {
  .project-layout {
    flex-direction: column;
    align-items: center; /* Yangi */
  }

  .project-info-card {
    width: 100%;
    max-width: 691px; /* Asl o‘lchamni saqlash uchun */
    margin: 0 auto; /* Markazga hizalash */
    min-height: auto;
  }

  .project-gallery-wrapper {
    width: 100%;
  }
}

/* >= 768px va < 991px */
@media (max-width: 990px) and (min-width: 768px) {
  .project-info-card {
    padding: 24px;
  }

  .title {
    font-size: 2rem;
  }

  .project-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* >= 375px va < 768px */
@media (max-width: 767px) and (min-width: 375px) {
  .project-layout {
    flex-direction: column;
    gap: 24px;
  }

  .project-info-card {
    padding: 20px;
  }

  .title {
    font-size: 1.5rem;
  }

  .project-gallery {
    grid-template-columns: 1fr;
  }

  .breadcrumbs {
    font-size: 13px;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
  }

  .close-btn {
    top: -36px;
  }
}

/* < 375px — max siqilgan */
@media (max-width: 374px) {
  .project-info-card {
    padding: 16px;
  }

  .title {
    font-size: 1.25rem;
  }

  .project-description {
    font-size: 0.875rem;
  }

  .info-section p {
    font-size: 0.875rem;
  }

  .nav-btn {
    width: 32px;
    height: 32px;
  }

  .breadcrumbs {
    font-size: 12px;
  }
}
</style>
