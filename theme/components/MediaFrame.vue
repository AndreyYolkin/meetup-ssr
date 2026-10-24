<script setup lang="ts">
defineProps<{
  caption?: string
}>()
</script>

<template>
  <figure class="media-frame">
    <div class="media-frame-inner">
      <slot />
    </div>
    <figcaption v-if="caption" class="mt-[var(--s-3)] text-sm text-fg-dim text-center">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.media-frame-inner {
  border-radius: var(--r-lg);
  border: 1px solid var(--border);
  overflow: hidden;
  background-color: var(--bg-elevated);
}
.media-frame-inner :deep(img),
.media-frame-inner :deep(video) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
