<template>
  <section class="projects-section" id="projects">
    <div class="container">
      <div class="projects-header">
        <h2 class="section-title">Наши проекты</h2>
        <NuxtLink to="/all-projects/all-projects" class="view-all-button">
          Смотреть все
        </NuxtLink>
      </div>

      <div class="projects-grid">
        <div
          class="project-card"
          v-for="project in projects.slice(0, 3)"
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
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Типизация проекта
interface ProjectPhoto {
  name: string;
}

interface DescriptionBlock {
  type: string;
  data: {
    text?: string;
    items?: string[];
  };
}

interface Project {
  id: number;
  title: string;
  slug: string;
  photos: ProjectPhoto[];
  short_description?: {
    blocks?: DescriptionBlock[];
  };
  works: string;
}

// Ссылки и данные
const router = useRouter();
const projects = ref<Project[]>([]);

// Получить первую фотку
const getFirstProjectImage = (project: Project): string | undefined => {
  if (!project?.photos?.length) return undefined;
  return `https://api.los-bio.ru/files/projects/${project.photos[0].name}`;
};

// Обрезать описание
const getShortDescription = (project: Project): string => {
  return (
    project.short_description?.blocks?.[0]?.data?.text || project.works || ""
  );
};

// Ошибка при загрузке картинки
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  if (!target) return;

  target.style.display = "none";

  const wrapper = target.parentElement;
  if (wrapper) {
    const placeholder = document.createElement("div");
    placeholder.className = "project-image-placeholder";
    placeholder.innerHTML = `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16L8.5 10.5L11 14L14.5 9L20 16M4 16H20M4 16V4H20V16" stroke="#555" stroke-width="2"/>
      </svg>
    `;
    wrapper.appendChild(placeholder);
  }
};

// Перейти на проект
const goToProject = (slug: string) => {
  router.push(`/projects/${slug}`);
};

onMounted(async () => {
  try {
    const response = await fetch("https://api.los-bio.ru/projects/");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    projects.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка загрузки проектов:", error);
  }
});
</script>

<style scoped>
.projects-section {
  width: 100%;
  background-color: #02041f;
  padding: 100px 0;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 30px;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 100;
  color: #ffffff;
  font-family: "Gilroy-Light", sans-serif;
}

.view-all-button {
  background-color: transparent;
  color: #00a3e0;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid #00a3e0;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Gilroy-Light", sans-serif;
  transition: all 0.3s ease;
}

.view-all-button:hover {
  background-color: #00a3e0;
  color: #fff;
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
  transition: 0.3s ease;
  cursor: pointer;
  border: 1px solid #1e2130;
  width: 100%;
  max-width: 377px;
  height: 497px;
  display: flex;
  flex-direction: column;
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
  margin: 15px auto 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-name {
  font-size: 1.3rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 15px;
}

.project-description {
  font-size: 0.9rem;
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
  font-size: 0.9rem;
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

/* Адаптивность */

@media (max-width: 1200px) {
  .section-title {
    font-size: 2.4rem;
  }

  .view-all-button {
    font-size: 0.95rem;
    padding: 8px 18px;
  }

  .project-name {
    font-size: 1.2rem;
  }

  .project-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 991px) {
  .projects-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .view-all-button {
    margin-right: -122px;
  }

  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .project-card {
    max-width: 100%;
    height: auto;
  }

  .project-image-wrapper {
    height: 200px;
  }

  .project-info-row {
    flex-direction: column;
  }

  .info-label {
    margin-bottom: 4px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .view-all-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .project-card {
    height: auto;
    max-width: 300px;
  }

  .project-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 375px) {
  .section-title {
    font-size: 1.6rem;
  }

  .view-all-button {
    font-size: 0.85rem;
    padding: 6px 14px;
  }

  .project-image-wrapper {
    height: 180px;
  }

  .project-description {
    font-size: 0.8rem;
  }

  .project-name {
    font-size: 1.1rem;
  }
}
</style>
