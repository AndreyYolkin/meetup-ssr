<script setup lang="ts">
defineProps<{
  label: string
  ratio?: string
}>()
</script>

<template>
  <div
    class="media-placeholder flex items-center justify-center"
    :style="{ aspectRatio: ratio ?? '16 / 10' }"
  >
    <div class="px-[var(--s-4)] text-center font-mono text-sm text-fg-dim">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.media-placeholder {
  border-radius: var(--r-lg);
  border: 1px dashed var(--border-hi);
  background-color: var(--bg-elevated);
}
</style>
