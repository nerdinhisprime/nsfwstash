<script setup lang="ts">
const selectedFile = ref<File | null>(null);
const uploading = ref(false);
const error = ref('');
const previewUrl = ref<string | null>(null);

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);

  previewUrl.value = URL.createObjectURL(file);
  selectedFile.value = file;
}

async function uploadImg() {
  if (!selectedFile.value || uploading.value) return;

  uploading.value = true;
  try {
    const formData = new FormData();
    formData.append('image', selectedFile.value);

    const response = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    const result = await response.json();
    console.log('Изображение загружено: ', result);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка';
  } finally {
    uploading.value = false;
  }
}
</script>

<template>
  <AppInput
    type="file"
    subtype="file-card"
    placeholder="Добавить"
    class="upload-files-button"
    accept="image/*"
    @change="onFileChange"
  />
  <AppButton :disabled="!selectedFile || uploading" @click="uploadImg">
    {{ uploading ? 'Отправка изображения' : 'Отправить' }}
  </AppButton>
  <span v-if="error">{{ error }}</span>
  <img v-if="previewUrl" :src="previewUrl" width="425" />
</template>

<style scoped></style>
