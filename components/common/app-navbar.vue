<template>
  <div class="app-navbar">
    <!-- Верхняя панель -->
    <header class="top-bar">
      <div class="container">
        <div class="contact-info">
          <span>
            <img src="/map-marker.png" alt="map" class="icon" />
            г. Красноярск, ул. Телевизорная 1, стр. 14, оф. 204
          </span>
          <span>
            <img src="/phone.png" alt="phone" class="icon" />
            +7 (391) 209 57–57
          </span>
          <span>
            <img src="/phone.png" alt="phone" class="icon" />
            +7 (923) 273 33–66
          </span>
          <span>
            <img src="/later.png" alt="email" class="icon" />
            los-bio@mail.ru
          </span>
          <NuxtLink to="/callback" class="callback">
            <img src="/order.png" alt="order" class="icon" />
            Заказать звонок
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Главная навигация -->
    <nav class="main-nav">
      <div class="container nav-content">
        <div class="logo">
          <NuxtLink to="/">
            <img src="/logo.png" alt="ЛОС-БИО" />
          </NuxtLink>
        </div>
        <ul class="nav-links">
          <li><NuxtLink to="/about">О компании</NuxtLink></li>
          <li><NuxtLink to="/projects">Проекты</NuxtLink></li>
          <li><NuxtLink to="/catalog">Каталог</NuxtLink></li>
          <li><NuxtLink to="/contacts">Контакты</NuxtLink></li>
        </ul>
        <div class="btn-wrapper">
          <NuxtLink to="/kp" class="btn">Получить КП</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.app-navbar {
  width: 100%;
  font-family: sans-serif;
  font-weight: 100;
}

.top-bar {
  background-color: #01021e;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  span,
  a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .callback {
    color: #58a6ff;
    font-weight: 500;
  }
}

.main-nav {
  background-color: #02041f;
  width: 100%;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

.logo img {
  height: 50px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 25px;
  padding: 0;
  margin: 0;

  a {
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: 0.2s;

    &:hover {
      color: #facc15;
    }
  }
}

.btn-wrapper .btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}

@media (max-width: 768px) {
  .contact-info {
    gap: 15px;
    font-size: 12px;
  }

  .nav-links {
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .nav-content {
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
