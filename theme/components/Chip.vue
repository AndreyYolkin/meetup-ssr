<script setup lang="ts">
defineProps<{ variant?: 'default' | 'muted' }>()
</script>

<template>
  <span class="chip" :class="{ 'text-fg-dim': variant === 'muted' }">
    <slot />
  </span>
</template>
