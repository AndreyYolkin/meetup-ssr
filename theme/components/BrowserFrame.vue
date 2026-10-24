<script setup lang="ts">
defineProps<{
  url?: string
  // 'natural' = let image set its own height; 'cover' = 16/11 crop
  fit?: 'natural' | 'cover'
}>()
</script>

<template>
  <div class="browser-frame">
    <div class="browser-chrome">
      <div class="browser-dots">
        <span class="dot dot-close" />
        <span class="dot dot-min" />
        <span class="dot dot-max" />
      </div>
      <div v-if="url" class="browser-url">{{ url }}</div>
    </div>
    <div class="browser-body" :class="{ 'browser-body-cover': fit === 'cover' }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.browser-frame {
  border-radius: var(--r-xl);
  border: 1px solid var(--border);
  overflow: hidden;
  background-color: var(--bg-elevated);
}
.browser-chrome {
  display: flex;
  align-items: center;
  gap: var(--s-4);
  padding: var(--s-3) var(--s-4);
  border-bottom: 1px solid var(--border);
  background-color: var(--surface);
}
.browser-dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot-close { background-color: #FF5F57; }
.dot-min   { background-color: #FEBC2E; }
.dot-max   { background-color: #28C840; }
.browser-url {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--fg-muted);
  flex: 1;
  text-align: center;
}
.browser-body {
  padding: 0;
  background-color: var(--bg);
}
.browser-body :deep(img),
.browser-body :deep(video),
.browser-body :deep(iframe) {
  display: block;
  width: 100%;
  height: auto;
}
.browser-body-cover {
  aspect-ratio: 16 / 11;
  overflow: hidden;
}
.browser-body-cover :deep(img),
.browser-body-cover :deep(video),
.browser-body-cover :deep(iframe) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}
</style>
