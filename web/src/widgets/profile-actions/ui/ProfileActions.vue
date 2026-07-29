<script setup lang="ts">
  import { AppDropDown } from '@/shared';
  import { DeleteAccount } from '@/features/delete-accout';
  import { Logout } from '@/features/logout'
</script>

<template>
  <AppDropDown>
    <DeleteAccount />
    <Logout />
  </AppDropDown>
</template>
