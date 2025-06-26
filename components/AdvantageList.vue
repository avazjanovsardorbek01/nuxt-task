<template>
  <section class="advantages-section">
    <div class="container">
      <h2 class="section-title">Наши преимущества</h2>
      <div class="advantages-grid">
        <div
          v-for="(advantage, idx) in advantages"
          :key="idx"
          class="advantage-card"
        >
          <div v-if="advantage.icon" class="icon-wrap">
            <img :src="advantage.icon" alt="" />
          </div>
          <h3 class="advantage-title">{{ advantage.title }}</h3>
          <p class="advantage-text">{{ advantage.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Advantage {
  title: string;
  description: string;
  icon?: string;
}

const advantages = ref<Advantage[]>([]);

onMounted(async () => {
  try {
    const { data, error } = await useFetch(
      "https://api.los-bio.ru/info/group/advantage"
    );

    console.log("API Response:", data.value);
    if (error.value) {
      console.error("Fetch Error:", error.value);
      throw error.value;
    }

    if (!Array.isArray(data.value)) {
      console.error("Data is not array:", data.value);
      throw new Error("Invalid data");
    }

    advantages.value = data.value.map((item: any, index: number) => {
      try {
        const p = JSON.parse(item.value);
        console.log(`Parsed item ${index}:`, p);

        return {
          title: p.title || "Без названия",
          description: p.description || "Без описания",
          icon: p.icon?.[0]
            ? `https://api.los-bio.ru/files/${p.icon[0].catalog}/${p.icon[0].name}`
            : undefined,
        };
      } catch (parseErr) {
        console.error("Ошибка парсинга JSON:", item.value);
        return {
          title: "Ошибка данных",
          description: "Не удалось распарсить",
        };
      }
    });
  } catch (err) {
    console.error("Catch Error:", err);
    advantages.value = [
      { title: "Оперативность расчётов", description: "…" },
      { title: "Большой опыт", description: "…" },
      { title: "Производство полного цикла", description: "…" },
      { title: "Гарантия качества", description: "…" },
    ];
  }
});
</script>

<style scoped>
.advantages-section {
  background: #02041f;
  padding: 80px 0;
}
.container {
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 20px;
}
.section-title {
  font-size: 2.5rem;
  color: #facc15;
  text-align: center;
  margin-bottom: 60px;
  font-weight: bold;
}
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
}
.advantage-card {
  background: #1a2035;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
.icon-wrap {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}
.icon-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.advantage-title {
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.advantage-text {
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>
