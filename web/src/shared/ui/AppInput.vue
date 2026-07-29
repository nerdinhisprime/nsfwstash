<script setup lang="ts">
  const model = defineModel();
  defineProps<{ placeholder?: string }>();
</script>

<template>
  <input v-model="model" :placeholder="placeholder"/>
</template>

<style scoped>
input {
  height: 30px;
}
</style>
