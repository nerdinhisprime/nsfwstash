<script setup lang="ts">
import { AppButton, AppInput } from '@/shared';
import { onUnmounted, ref } from 'vue';

const idImg = ref<string>('');
const imgURL = ref<string>(`${__API_URL__}/image?search=40`);

const getImage = async () => {
  fetch(`${__API_URL__}/image?${new URLSearchParams({ search: idImg.value })}`)
    .then((res) => {
      if (!res.ok) throw new Error('Loud error');
      return res.blob();
    })
    .then((res) => {
      if (imgURL.value.startsWith('blob:')) URL.revokeObjectURL(imgURL.value);
      imgURL.value = URL.createObjectURL(res);
    });
};
onUnmounted(() => {
  if (imgURL.value.startsWith('blob: ')) URL.revokeObjectURL(imgURL.value);
});
</script>

<template>
  <div>
    <img :src="imgURL" width="400" />
    <AppInput v-model="idImg" />
    <AppButton @click="getImage">get</AppButton>
  </div>
</template>
