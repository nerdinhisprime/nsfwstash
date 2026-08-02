<script setup lang="ts">
import { AppButton, AppInput } from '@/shared';
import { ref } from 'vue';

const idImage = ref<string>('');
const obj = ref<any>()
const img = ref(`${__API_URL__}/image?search=40`)

var getImage = async () => {
  var params = new URLSearchParams({
    search: idImage.value,
  });
  fetch(`${__API_URL__}/image?${params}`)
    .then(res => res.blob())
    .then(res => {
      img.value = URL.createObjectURL(res)
    })
};
</script>

<template>
  <div>
    <img :src="img" width="400"/>
    <AppInput v-model="idImage" />
    <AppButton @click="getImage">get</AppButton>
  </div>
</template>
