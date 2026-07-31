<script setup lang="ts">
import { ref } from 'vue';

const file = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    console.log('Selected file: ', file.value.name, file.value.type);
  }
};
const uploadFile = async () => {
  if (!file.value) return;
  if (!file.value.type) console.warn('File type is missing');

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await fetch(`${__API_URL__}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
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
