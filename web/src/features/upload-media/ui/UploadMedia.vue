<script setup lang="ts">
import { ref } from 'vue';

const file = ref(null);

const handleFileChange = (event: any) => {
  file.value = event.target.files[0];
  console.log(file.value);
};
const uploadFile = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await fetch(`${__API_URL__}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('Successfuly: ', data);
  } catch (err) {
    console.error('Error: ', err);
  }
};
</script>

<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <AppButton @click="uploadFile">Upload</AppButton>
  </div>
</template>
