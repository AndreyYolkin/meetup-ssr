<script setup lang="ts">
defineProps<{
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout hero flex flex-col justify-center h-full relative">
    <Mark v-if="mark !== false" />
    <div class="hero-content w-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.hero-content {
  max-width: none;
}
</style>
