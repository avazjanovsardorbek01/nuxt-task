<template>
  <div class="app-navbar">
    <!-- Верхняя панель -->
    <header class="top-bar">
      <div class="container">
        <div class="contact-info">
          <span class="contact-item">
            <img src="/map-marker.png" class="icon" />
            <span class="text"
              >г. Красноярск, ул. Телевизорная 1, стр. 14, оф. 204</span
            >
          </span>
          <span class="contact-item">
            <img src="/phone.png" alt="phone-icon" class="icon" />
            <span class="text">+7 (391) 209 57–57</span>
          </span>
          <span class="contact-item">
            <img src="/phone.png" alt="phone-icon" class="icon" />
            <span class="text">+7 (923) 273 33–66</span>
          </span>
          <span class="contact-item">
            <img src="/later.png" alt="email-icon" class="icon" />
            <span class="text">los-bio@mail.ru</span>
          </span>
          <NuxtLink to="/" class="callback">
            <img src="/order.png" class="icon" />
            <span class="text">Заказать звонок</span>
          </NuxtLink>
        </div>
      </div>
    </header>
    <!-- Навигация -->
    <nav class="main-nav">
      <div class="container nav-content">
        <div class="logo">
          <NuxtLink to="/">
            <img src="/logo.png" alt="ЛОС-БИО" class="logo-img" />
          </NuxtLink>
        </div>

        <!-- Desktop -->
        <ul class="nav-links" v-if="!isMobile">
          <li>
            <NuxtLink
              to="/about"
              class="nav-link"
              :class="{ active: $route.path === '/about' }"
            >
              О компании
              <span class="link-underline"></span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/#projects"
              class="nav-link"
              :class="{ active: $route.path === '/projects' }"
            >
              Проекты
              <span class="link-underline"></span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/catalog"
              class="nav-link"
              :class="{ active: $route.path === '/catalog' }"
            >
              Каталог
              <span class="link-underline"></span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contacts"
              class="nav-link"
              :class="{ active: $route.path === '/contacts' }"
            >
              Контакты
              <span class="link-underline"></span>
            </NuxtLink>
          </li>
        </ul>

        <!-- Burger для мобилки -->
        <button
          class="burger"
          @click="toggleMenu"
          :class="{ open: menuOpen }"
          aria-label="Меню"
          v-if="isMobile"
        >
          <span class="burger-line top"></span>
          <span class="burger-line middle"></span>
          <span class="burger-line bottom"></span>
        </button>

        <div class="btn-wrapper" v-if="!isMobile">
          <NuxtLink to="/" class="btn btn-primary">
            <span>Получить КП</span>
            <svg-icon name="arrow-right" class="btn-icon" />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <transition name="fade">
      <div
        v-if="menuOpen"
        class="mobile-menu-overlay"
        @click="toggleMenu"
      ></div>
    </transition>

    <transition name="slide">
      <div v-if="menuOpen" class="mobile-menu">
        <div class="mobile-menu-header">
          <img src="/logo.png" alt="ЛОС-БИО" class="mobile-logo" />
          <button
            class="close-btn"
            @click="toggleMenu"
            aria-label="Закрыть меню"
          >
            <svg-icon name="close" class="close-icon" />
          </button>
        </div>

        <ul class="mobile-links">
          <li>
            <NuxtLink to="/about" class="mobile-link" @click="toggleMenu">
              О компании
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#projects" class="mobile-link" @click="toggleMenu">
              Проекты
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/catalog" class="mobile-link" @click="toggleMenu">
              Каталог
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contacts" class="mobile-link" @click="toggleMenu">
              Контакты
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const menuOpen = ref(false);
const isMobile = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? "hidden" : "auto";
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 991;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.body.style.overflow = "auto";
});
</script>

<style lang="scss" scoped>
.app-navbar {
  position: relative;
  z-index: 1000;
  font-family: "Gilroy-Light";
}

.top-bar {
  background: linear-gradient(90deg, #01021e 0%, #02052a 100%);
  padding: 12px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .contact-item,
  .callback {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 400;
    transition: all 0.3s ease;

    .icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    &:hover {
      color: #1078d7;
    }
  }

  .callback {
    color: #1078d7;
    font-weight: 500;

    &:hover {
      opacity: 0.8;
    }
  }
}

.main-nav {
  background: #02041f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-img {
    height: 50px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .nav-links {
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-link {
    position: relative;
    color: white;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    padding: 10px 0;
    transition: color 0.3s ease;

    &:hover {
      color: #1078d7;

      .link-underline {
        width: 100%;
        opacity: 1;
      }
    }

    &.active {
      color: #1078d7;

      .link-underline {
        width: 100%;
        opacity: 1;
      }
    }
  }

  .link-underline {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #1078d7;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: #1078d7;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 163, 224, 0.3);

    &:hover {
      background: darken(#1078d7, 10%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 163, 224, 0.4);
    }

    .btn-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  }
}
.mobile-contacts {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0f112e, #1a1d3a);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  .mobile-contact {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;

    .contact-icon {
      width: 20px;
      height: 20px;
      fill: currentColor;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: #1078d7;

      .contact-icon {
        transform: scale(1.2);
      }
    }
  }
}
.mobile-btn {
  margin: 20px auto 0 auto; // центрируем
  width: fit-content; // ширина по контенту
  max-width: 100%;
  padding: 14px 24px;
  background: #1078d7;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  transition:
    background 0.3s ease,
    transform 0.2s ease;

  .btn-icon {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  &:hover {
    background: darken(#1078d7, 10%);
    transform: translateY(-2px);
  }
}

/* Бургер меню */
.burger {
  position: relative;
  width: 30px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  .burger-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    transition: all 0.3s ease;

    &.top {
      top: 0;
    }

    &.middle {
      top: 50%;
      transform: translateY(-50%);
    }

    &.bottom {
      bottom: 0;
    }
  }

  &.open {
    .top {
      transform: translateY(11px) rotate(45deg);
    }

    .middle {
      opacity: 0;
    }

    .bottom {
      transform: translateY(-11px) rotate(-45deg);
    }
  }
}

/* Мобильное меню */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 999;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 100%;
  background: #0a0c2a;
  z-index: 1000;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);

  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .mobile-logo {
    height: 40px;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    padding: 5px;
    cursor: pointer;

    .close-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
      transition: transform 0.3s ease;
    }

    &:hover .close-icon {
      transform: rotate(90deg);
    }
  }

  .mobile-links {
    list-style: none;
    padding: 0;
    margin: 0 0 auto 0;
  }

  .mobile-link {
    display: block;
    padding: 15px 0;
    color: white;
    font-size: 18px;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: color 0.3s ease;

    &:hover {
      color: #1078d7;
    }
  }

  .mobile-contacts {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .mobile-contact {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 15px;
    text-decoration: none;
    margin-bottom: 15px;
    transition: color 0.3s ease;

    .contact-icon {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    &:hover {
      color: #1078d7;
    }
  }

  .mobile-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Адаптивность */
@media (max-width: 991px) {
  .top-bar .contact-info {
    justify-content: center;
    gap: 20px;
  }

  .contact-item .text {
    display: none;
  }

  .callback .text {
    display: inline;
  }
  .contact-item .icon,
  .callback .icon {
    display: none;
  }
}

@media (max-width: 768px) {
  .main-nav .container {
    height: 70px;
  }

  .main-nav .logo-img {
    height: 40px;
  }
}

@media (max-width: 480px) {
  .top-bar {
    padding: 8px 0;
  }

  .main-nav .container {
    height: 60px;
    max-width: 220px;
  }

  .mobile-menu {
    width: 280px;
    padding: 20px;
  }
  .contact-item .icon,
  .callback .icon {
    display: none;
  }
}
</style>
