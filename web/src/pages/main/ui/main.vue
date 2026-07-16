<script setup lang="ts">
import { ping } from '@/shared/lib';
import { AppButton } from '@/shared';
import { reactive, ref } from 'vue';

const msg = ref('')

const usrData = reactive({
  email: '',
  password: '',
  name: '',
})

const sayHi = () => fetch(`${__API_URL__}/hi`)
  .then(res => res.json())
  .then(res => {
    console.log(res.message)
    msg.value = res.message
  })

const post = async () => {
  fetch(`${__API_URL__}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: usrData.email,
      password: usrData.password,
      name: usrData.name,
    }),
  })
  .then(res => res.json())
  .then(console.log)
  .catch(err => console.log('ушибОчка: ', err))
};
</script>

<template>
  <AppButton @click="ping">ping pong?</AppButton>
  <AppButton @click="sayHi">hello</AppButton>
  <p>{{ msg }}</p>
  <form @submit.prevent="post">
    <input v-model="usrData.email" type="email">
    <input v-model="usrData.password" type="password">
    <input v-model="usrData.name" type="text">
    <button type="submit">submit</button>
  </form>
</template>
