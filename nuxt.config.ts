export default defineNuxtConfig({
  css: ["~/assets/styles/main.scss"],

  modules: ["@nuxt/image"],

  image: {
    domains: ["i.ibb.co", "api.los-bio.ru", "los-bio.ru"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/_variables.scss" as *;`,
        },
      },
    },
  },
});
