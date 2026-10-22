<template>
  <div class="window-content">
    <Navigation />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.win-content {
  background-color: #333;
}
.win-navigation {
  background-color: #444;
}
</style>
