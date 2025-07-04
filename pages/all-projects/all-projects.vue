<template>
  <section class="projects-section">
    <div class="container">
      <h2 class="section-title">Все проекты</h2>
      <div class="projects-grid">
        <div
          class="project-card"
          v-for="project in projects"
          :key="project.id"
          @click="goToProject(project.slug)"
        >
          <div class="project-image-wrapper">
            <img
              v-if="getFirstProjectImage(project)"
              :src="getFirstProjectImage(project)"
              :alt="project.title"
              class="project-image"
              @error="handleImageError"
            />
            <div v-else class="project-image-placeholder">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 16L8.5 10.5L11 14L14.5 9L20 16M4 16H20M4 16V4H20V16"
                  stroke="#555"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-name">{{ project.title }}</h3>
            <p class="project-description">
              {{ getShortDescription(project) }}
            </p>
            <div class="project-info-row">
              <span class="info-label">Тип работ:</span>
              <span class="info-value">{{ project.works }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const projects = ref([]);
const router = useRouter();

const getFirstProjectImage = (project) =>
  project?.photos?.[0]?.name
    ? `https://api.los-bio.ru/files/projects/${project.photos[0].name}`
    : null;

const getShortDescription = (project) =>
  project.short_description?.blocks?.[0]?.data?.text || project.works || "";

const handleImageError = (e) => {
  e.target.style.display = "none";
};

const goToProject = (slug) => {
  router.push(`/projects/${slug}`);
};

onMounted(async () => {
  try {
    const res = await fetch("https://api.los-bio.ru/projects/");
    const data = await res.json();
    projects.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка загрузки проектов:", error);
  }
});
</script>

<style scoped>
.projects-section {
  padding: 100px 0;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 40px;
  font-weight: 100;
  color: #ffffff;
  font-family: "Gilroy-Light", sans-serif;
  position: relative;
  margin-bottom: 40px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(377px, 1fr));
  gap: 30px;
  justify-items: center;
}

.project-card {
  background-color: #0d0f1c;
  border-radius: 19px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #1e2130;
  width: 377px;
  height: 497px;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: "Gilroy-Light", sans-serif;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 163, 224, 0.2);
  border-color: #00a3e0;
}

.project-image-wrapper {
  width: calc(100% - 30px);
  height: 220px;
  overflow: hidden;
  position: relative;
  margin: 15px 15px 0 15px;
  border-radius: 8px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
}

.project-card:hover .project-image {
  transform: scale(1.03);
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #1a1c2b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-content {
  padding: 20px 25px 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: 22px;
  font-weight: 200;
  color: #ffffff;
  margin-bottom: 15px;
}

.project-description {
  font-size: 14px;
  line-height: 1.6;
  color: #b0b2c3;
  margin-top: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-info-row {
  display: flex;
  margin-top: auto;
  font-size: 14px;
}

.info-label {
  color: #00a3e0;
  font-weight: 500;
  min-width: 70px;
  margin-right: 10px;
}

.info-value {
  color: #b0b2c3;
  flex-grow: 1;
}

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    width: 100%;
    max-width: 377px;
    height: auto;
  }

  .project-info-row {
    flex-direction: column;
  }

  .info-label {
    margin-bottom: 4px;
  }
}
</style>
