<template>
  <Layout>
    <div v-if="project">
      <h1>{{ project.title }}</h1>
      <div v-html="project.content"></div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const project = ref(null);

onMounted(async () => {
  const slug = route.params.slug;
  const { data } = await useFetch(`https://api.los-bio.ru/projects/${slug}`);
  project.value = data.value;
});
</script>
