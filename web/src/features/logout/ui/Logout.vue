<script setup lang="ts">
import { AppButton, AppDialog } from '@/shared';
import { ref } from 'vue';
const modalRef = ref<InstanceType<typeof AppDialog>>();
</script>

<template>
  <AppButton @click="console.log(':)'); modalRef?.open()">Log out</AppButton>
  <AppDialog ref="modalRef">minet</AppDialog>
</template>
