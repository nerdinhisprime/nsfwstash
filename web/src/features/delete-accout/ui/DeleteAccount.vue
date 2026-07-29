<script setup lang="ts">
import { AppButton, AppDialog, AppInput } from '@/shared';
import { ref } from 'vue';

const modalRef = ref<InstanceType<typeof AppDialog>>();
const password = ref<string>('');

const deleteUser = () => {
  fetch(`${__API_URL__}/user/delete`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      password: password.value,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Deleting is failed');
    })
    .catch((err) => console.error(err));
};
</script>

<template>
  <AppButton @click="modalRef?.open()">Delete account</AppButton>
  <AppDialog ref="modalRef">
    <div style="background: pink">
      <p>Enter your password to confirm</p>
      <AppInput v-model="password" placeholder="are you sure?" />
      <p>After entered password, you can delete</p>
      <AppButton @click="deleteUser">Delete account</AppButton>
    </div>
  </AppDialog>
</template>
