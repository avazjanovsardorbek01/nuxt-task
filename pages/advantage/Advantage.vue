<template>
  <section class="advantages-section">
    <div class="container">
      <h2 class="section-title" v-animate="'fadeInDown'">Наши преимущества</h2>

      <div class="advantages-grid">
        <div
          v-for="(advantage, idx) in advantages"
          :key="idx"
          class="advantage-card"
          v-animate="{
            enterClass: 'fadeInUp',
            delay: idx * 100,
            duration: 800,
          }"
        >
          <div v-if="advantage.icon" class="icon-wrap floating">
            <img :src="advantage.icon" alt="icon" />
          </div>

          <div class="advantage-text-wrap">
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-text">{{ advantage.description }}</p>
          </div>

          <div class="shine" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Анимационная директива
const vAnimate = {
  mounted(el: HTMLElement, binding: any) {
    const options = {
      enterClass: binding.value.enterClass || binding.value || "fadeIn",
      delay: binding.value.delay || 0,
      duration: binding.value.duration || 1000,
    };

    setTimeout(() => {
      el.style.opacity = "0";
      el.classList.add("animate__animated", `animate__${options.enterClass}`);
      el.style.animationDuration = `${options.duration}ms`;

      const handler = () => {
        el.style.opacity = "1";
        el.removeEventListener("animationend", handler);
      };

      el.addEventListener("animationend", handler);
    }, options.delay);
  },
};

interface Advantage {
  title: string;
  description: string;
  icon?: string;
}

const advantages = ref<Advantage[]>([]);

// SSR-friendly fetch
const { data, error } = await useFetch(
  "https://api.los-bio.ru/info/group/advantage"
);

if (!error.value && Array.isArray(data.value)) {
  advantages.value = data.value.map((item: any) => {
    try {
      const parsed = JSON.parse(item.value);
      return {
        title: parsed.title || "Без названия",
        description: parsed.description || "Без описания",
        icon: parsed.icon || undefined,
      };
    } catch {
      return {
        title: "Ошибка данных",
        description: "Не удалось распарсить описание",
      };
    }
  });
} else {
  // Фолбэк данные
  advantages.value = [
    {
      title: "Оперативность расчётов",
      description:
        "Рассчитываем стоимость оборудования в течение нескольких часов после вашей заявки",
      icon: "/icons/fast.svg",
    },
    {
      title: "Большой опыт",
      description:
        "Более 10 лет работы в сфере очистных сооружений и экологических технологий",
      icon: "/icons/exp.svg",
    },
    {
      title: "Производство полного цикла",
      description:
        "От проектирования до монтажа — все работы выполняем сами, без посредников",
      icon: "/icons/prod.svg",
    },
    {
      title: "Гарантия качества",
      description:
        "Наша продукция соответствует ГОСТ и ТУ, имеет все необходимые сертификаты",
      icon: "/icons/quality.svg",
    },
  ];
}
</script>

<style scoped>
.advantages-section {
  width: 100%;
  background-color: #02041f;
  padding: 100px 0;
}

.container {
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 30px;
}

.section-title {
  font-size: 2.8rem;
  color: white;
  font-weight: 400;
  margin-bottom: 80px;
  text-align: start;
  opacity: 0;
  transition: 0.3s;

  @media (max-width: 768px) {
    text-align: center;
  }
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 90px;
  justify-items: center;
}

.advantage-card {
  display: flex;
  align-items: center;
  gap: 25px;
  background: rgba(12, 19, 28, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 19px;
  padding: 30px;
  max-width: 569px;
  width: 100%;
  transition: 0.5s ease;
  overflow: hidden;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
}

.advantage-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: rgba(12, 19, 28, 0.9);
  border-color: rgba(0, 123, 255, 0.3);
}

.icon-wrap {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.icon-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(0, 123, 255, 0.5));
  transition: 0.5s ease;
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.advantage-text-wrap {
  flex: 1;
  color: white;
}

.advantage-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.advantage-text {
  font-family: "Gilroy-Light", sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
}

.shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.8s;
}

.advantage-card:hover .shine {
  left: 100%;
}

/* Responsive */

@media (max-width: 1200px) {
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .section-title {
    font-size: 2.4rem;
    margin-bottom: 60px;
  }

  .advantage-title {
    font-size: 1.3rem;
  }

  .advantage-text {
    font-size: 1rem;
  }
}

@media (max-width: 991px) {
  .advantage-card {
    flex-direction: row;
    padding: 25px;
  }

  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .advantage-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px 20px;
    max-width: auto;
  }

  .icon-wrap {
    margin-bottom: 20px;
  }

  .advantage-title {
    font-size: 1.2rem;
  }

  .advantage-text {
    font-size: 0.95rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 50px;
    max-width: 20px;
    text-align: center;
  }
}

@media (max-width: 375px) {
  .advantage-card {
    padding: 25px 15px;
  }

  .icon-wrap {
    width: 60px;
    height: 60px;
  }

  .advantage-title {
    font-size: 1.1rem;
  }

  .advantage-text {
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1.6rem;
    margin-bottom: 40px;
  }
}

@media (max-width: 320px) {
  .advantage-card {
    padding: 25px 15px;
  }
}
</style>
