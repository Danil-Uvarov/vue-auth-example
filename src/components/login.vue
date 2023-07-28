<template>
  <form class="form__wrapper" @submit.prevent="login">
    <input v-model="form.email" class="login" name="email" type="text" />
    <input
      v-model="form.password"
      class="password"
      name="password"
      type="password"
    />
    <button class="button">Войти</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import router from '@/router/router'
  import { IRequestLogin } from '@/models/reguest/IRequestLogin'
  import { RouteNames } from '@/models/RouteNames'
  import { useAuthStore } from '@/stores/auth'
  const form = ref<IRequestLogin>({
    email: '',
    password: '',
  })
  const authStore = useAuthStore()

  const login = async () => {
    await authStore.login(form.value)

    await router.push({ name: RouteNames.Home })
  }
</script>

<style>
  .form__wrapper {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    height: 100%;
  }

  .password {
    max-width: 200px;
    padding: 10px;
  }

  .login {
    max-width: 200px;
    padding: 10px;
  }

  .button {
    background-color: red;
    max-width: 200px;
    padding: 10px;
  }
</style>
