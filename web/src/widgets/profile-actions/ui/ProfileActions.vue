<script setup lang="ts">
  import { AppDropDown } from '@/shared';
  import { OpenProfile } from '@/features/open-profile';
  import { DeleteAccount } from '@/features/delete-accout';
  import { Logout } from '@/features/logout'
</script>

<template>
  <AppDropDown>
    <OpenProfile />
    <DeleteAccount />
    <Logout />
  </AppDropDown>
</template>
