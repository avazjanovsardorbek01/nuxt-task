<template>
  <footer class="footer">
    <div class="container footer-top">
      <div class="footer-col logo-col">
        <img src="/logo.png" alt="ЛОС-БИО" class="footer-logo" />
        <p class="footer-description">
          Биологические очистные сооружения и инженерные решения для вашего
          проекта.
        </p>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Меню</h4>
        <ul class="footer-list">
          <li><NuxtLink to="/">Главная</NuxtLink></li>
          <li><NuxtLink to="/about">О компании</NuxtLink></li>
          <li><NuxtLink to="/projects">Проекты</NuxtLink></li>
          <li><NuxtLink to="/catalog">Каталог</NuxtLink></li>
          <li><NuxtLink to="/contacts">Контакты</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Контакты</h4>
        <ul class="footer-list contacts">
          <li>
            <img src="/map-marker.png" class="icon" alt="map" />
            г. Красноярск, ул. Телевизорная 1, стр. 14, оф. 204
          </li>
          <li>
            <img src="/phone.png" class="icon" alt="phone" />
            +7 (391) 209 57–57
          </li>
          <li>
            <img src="/phone.png" class="icon" alt="phone" />
            +7 (923) 273 33–66
          </li>
          <li>
            <img src="/later.png" class="icon" alt="email" />
            los-bio@mail.ru
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© 2025 ЛОС-БИО. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #01021e;
  color: #b0b2c3;
  font-family: "Gilroy-Light", sans-serif;
  font-size: 14px;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 30px;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 60px 0 40px;
  justify-content: space-between;
}

.footer-col {
  flex: 1;
  min-width: 240px;
}

.logo-col {
  max-width: 300px;
}

.footer-logo {
  width: 140px;
  margin-bottom: 16px;
}

.footer-description {
  line-height: 1.6;
  color: #b0b2c3;
  font-size: 14px;
}

.footer-title {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: 600;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b0b2c3;
  font-size: 14px;
}

.footer-list a {
  text-decoration: none;
  color: #b0b2c3;
  transition: color 0.3s;
}

.footer-list a:hover {
  color: #00a3e0;
}

.icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid #1e2130;
  text-align: center;
  padding: 20px 0;
  color: #777;
  font-size: 13px;
}
</style>
