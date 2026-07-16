<script setup lang="ts">
  import { reactive } from 'vue';
  import { RegisterUser } from '@/entities/register-user';

  const userData = reactive({
    userEmail: '',
    userPassword: '',
  });
</script>

<template>
  <RegisterUser v-model="userData" />
  <p style="color: white"> da{{ userData.userEmail }}</p>
</template>
