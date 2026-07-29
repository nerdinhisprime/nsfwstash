<script setup lang="ts">
import { AppButton, AppDialog } from '@/shared';
import { ref } from 'vue';
const modalRef = ref<InstanceType<typeof AppDialog>>();
const logoutUser = () => localStorage.clear();
</script>

<template>
  <AppButton @click="modalRef?.open()">Log out</AppButton>
  <AppDialog ref="modalRef">
    <div style="background-color: gray">
      <p>are you sure?</p>
      <AppButton @click="logoutUser">yes</AppButton>
    </div>
  </AppDialog>
</template>
