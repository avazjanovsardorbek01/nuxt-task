<template>
  <ul class="advantages">
    <li v-for="adv in advantages" :key="adv.id">
      <img :src="adv.icon" :alt="adv.title" />
      <h3>{{ adv.title }}</h3>
      <p>{{ adv.text }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const advantages = ref([]);
onMounted(async () => {
  const { data } = await useFetch(
    "https://api.los-bio.ru/info/group/advantage"
  );
  advantages.value = data.value || [];
  console.log(data.value, "advantages");
});
</script>
