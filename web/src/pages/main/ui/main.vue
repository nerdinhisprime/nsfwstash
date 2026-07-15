<script setup lang="ts">
import { ping } from '@/shared/lib';
import { AppButton } from '@/shared';
import { ref } from 'vue';

const msg = ref('')

const sayHi = () => fetch(`${__API_URL__}/hi`)
  .then(res => res.json())
  .then(res => {
    console.log(res.message)
    msg.value = res.message
  })
</script>

<template>
  <AppButton @click="ping">ping pong?</AppButton>
  <AppButton @click="sayHi">hello</AppButton>
  <p>{{ msg }}</p>
</template>
