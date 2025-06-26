<template>
  <section class="project-detail" v-if="project">
    <div class="container">
      <h1 class="title">{{ project.title }}</h1>

      <div v-if="project.photos?.length" class="project-gallery">
        <img
          v-for="(photo, index) in project.photos"
          :key="index"
          :src="getProjectPhotoUrl(photo)"
          :alt="`${project.title} - фото ${index + 1}`"
          class="project-image"
        />
      </div>
      <div v-else class="no-images">Нет изображений проекта</div>

      <div class="project-info">
        <h3>Работы:</h3>
        <p>{{ project.works }}</p>

        <h3>Оборудование:</h3>
        <p>{{ project.equipment }}</p>

        <h3>Заказчик:</h3>
        <p>{{ project.customer }}</p>
      </div>

      <div
        class="project-description"
        v-html="formatDescription(project.description)"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const project = ref(null);

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
});
</script>

<style scoped>
.project-detail {
  background-color: #02041f;
  color: #ffffff;
  padding: 80px 0;
  font-family: "Gilroy-Light", sans-serif;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  font-size: 40px;
  font-weight: 100;
  color: #facc15;
  margin-bottom: 40px;
  text-align: center;
}

.project-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.project-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
  background-color: #1a1c2b;
  box-shadow: 0 4px 12px rgba(0, 163, 224, 0.15);
}

.no-images {
  text-align: center;
  color: #888;
  padding: 40px 0;
  font-size: 16px;
}

.project-info {
  background-color: #0d0f1c;
  border: 1px solid #1e2130;
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 40px;
}

.project-info h3 {
  font-size: 18px;
  color: #00a3e0;
  margin-top: 20px;
  margin-bottom: 8px;
  font-weight: 500;
}

.project-info p {
  color: #b0b2c3;
  font-size: 15px;
  line-height: 1.5;
}

.project-description {
  font-size: 16px;
  line-height: 1.7;
  color: #d0d2e0;
}

.project-description :deep(h4) {
  color: #facc15;
  font-size: 18px;
  margin-top: 24px;
  margin-bottom: 10px;
  font-weight: 500;
}

.project-description :deep(p) {
  margin-bottom: 16px;
}

.project-description :deep(ul) {
  padding-left: 22px;
  margin-bottom: 16px;
}

.project-description :deep(li) {
  list-style: disc;
  margin-bottom: 6px;
}
</style>
