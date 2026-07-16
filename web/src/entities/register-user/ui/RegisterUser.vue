<script setup lang="ts">
  import { AppButton, AppInput } from '@/shared'

  interface UserData {
    userEmail: string;
    userPassword: string;
  }

  const model = defineModel<UserData>({ required: true })
</script>

<template>
  <form class="register" @submit.prevent>
    <h2>Welcome</h2>
    <AppInput
      v-model="model.userEmail"
      type="email"
      placeholder="email"
    />
    <AppInput
      v-model="model.userPassword"
      type="password"
      placeholder="password"
    />
    <AppButton>Create</AppButton>
    <p>{{ model.userEmail }}</p>
  </form>
</template>

<style scoped>
.register {
  display: grid;
  padding: 10px;
  width: 50vw;
  background-color: #222;
}
@media (max-width: 576px) {
  .register {
    width: 70vw;
  }
}
@media (min-width: 576px) {
  .register {
    width: 500px;
  }
}
</style>
