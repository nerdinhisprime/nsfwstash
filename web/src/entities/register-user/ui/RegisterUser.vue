<script setup lang="ts">
import { AppButton, AppInput } from '@/shared';
import { ref } from 'vue';

const count = ref(0);

const emit = defineEmits<{
  submit: [count: number];
  //(e: 'submit', count: number): void;
}>();

const model = defineModel<{
  userEmail: string;
  userPassword: string;
}>({ required: true });

defineProps({ title: String });
</script>

<template>
  <form class="register" @submit.prevent="emit('submit', count++)">
    <RouterLink to="/"><< back</RouterLink>
    <h2>{{ title || 'Welcome'}}</h2>
    <AppInput v-model="model.userEmail" type="email" placeholder="email" />
    <AppInput
      v-model="model.userPassword"
      type="password"
      placeholder="password"
    />
    <AppButton type="submit" style="margin-top: 30px">Submit</AppButton>
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
