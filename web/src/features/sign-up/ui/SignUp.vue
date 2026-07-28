<script setup lang="ts">
  import { ref } from 'vue';
  import { RegisterUser } from '@/entities/register-user';

  const userData = ref({
    userEmail: '',
    userPassword: '',
  });

  const signupUser = () => {
    fetch(`${__API_URL__}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.value.userEmail,
        password: userData.value.userPassword,
        name: 'Eva',
      }),
    })
    .then(res => res.json())
    .catch(err => console.log('ERROR: ', err))
  };
</script>

<template>
  <RegisterUser v-model="userData" @submit="signupUser" />
</template>
