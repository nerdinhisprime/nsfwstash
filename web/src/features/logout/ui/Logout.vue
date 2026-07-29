<script setup lang="ts">
import { AppButton, AppDialog } from '@/shared';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const modalRef = ref<InstanceType<typeof AppDialog>>();

const logoutUser = () => {
  fetch(`${__API_URL__}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) throw new Error('Logout failed');
      router.push('/')
    })
    .catch((err) => console.error('Logout failed', err));
};
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
