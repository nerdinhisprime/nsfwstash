<script setup lang="ts">
  import { ProfileActions } from '@/widgets/profile-actions';
</script>

<template>
  <nav class="navigation">
    <RouterLink :to="{ name: 'register' }">Sign up</RouterLink>
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    <ProfileActions />
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  column-gap: 10px;
}
</style>
