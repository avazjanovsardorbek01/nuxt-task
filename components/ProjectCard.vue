<template>
  <div class="project-card" @click="$router.push(`/projects/${project.slug}`)">
    <img :src="project.image" :alt="project.title" />
    <h4>{{ project.title }}</h4>
  </div>
</template>

<script setup lang="ts">
defineProps<{ project: any }>();
</script>
