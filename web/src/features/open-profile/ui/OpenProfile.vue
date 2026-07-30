<script setup lang="ts">
  import { AppButton } from '@/shared';
</script>
<template>
  <AppButton>
    <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
  </AppButton>
</template>
