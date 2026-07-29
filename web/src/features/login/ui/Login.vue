<script setup lang="ts">
import { RegisterUser } from '@/entities/register-user';
import { ref } from 'vue';

const userData = ref({
  userEmail: '',
  userPassword: '',
});

const loginUser = () => {
  fetch(`${__API_URL__}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: userData.value.userEmail,
      password: userData.value.userPassword,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Login error');
      return res.json();
    })
    .then(() => {
      console.log('ура, победа');
    })
    .catch((err) => console.error('ERRROR: ', err));
};
</script>
<template>
  <RegisterUser v-model="userData" @submit="loginUser" title="Welcome back" />
</template>
