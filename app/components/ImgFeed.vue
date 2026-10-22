<script setup lang="ts">
interface ImageItem {
  filename: string;
  url: string;
}
const {
  data: images,
  status,
  error,
} = await useFetch<ImageItem[]>('/api/images');
</script>

<template>
  <div>
    <h2>Галлерея</h2>
    <p v-if="status === 'pending'">Загрузка списка...</p>
    <p v-else-if="error">Не удалось загрузить список изображений</p>

    <div v-else class="gallery">
      <img
        v-for="image in images ?? []"
        :key="image.filename"
        :src="image.url"
        :alt="image.filename"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.gallery img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
</style>
