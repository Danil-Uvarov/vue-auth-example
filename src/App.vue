<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import TheHeader from './layouts/LayoutDefault.vue'
  import login from './layouts/LayoutLogin.vue'

  const route = useRoute()

  const layout = computed(() => {
    switch (route.meta.layout) {
      case 'login':
        return login
    }

    return TheHeader
  })
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
