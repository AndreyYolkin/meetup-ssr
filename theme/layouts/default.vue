<script setup lang="ts">
defineProps<{
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout default flex flex-col h-full">
    <header v-if="$slots.title" class="mb-[var(--s-6)]">
      <Mark v-if="mark !== false" />
      <h1 class="default-title">
        <slot name="title" />
      </h1>
      <h2 v-if="$slots.subtitle" class="default-subtitle">
        <slot name="subtitle" />
      </h2>
    </header>
    <div class="flex-1 min-h-0 overflow-auto default-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.default-title {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.default-subtitle {
  color: var(--fg-muted);
  font-size: var(--t-h3);
  font-weight: 500;
  margin: var(--s-3) 0 0 0;
}
/* When the slide doesn't use ::title::, its own h1 leads the default
   slot. Give it the same typography as a titled slide so layout
   consistency holds without forcing every slide to migrate. */
.default-body :deep(h1:first-child) {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0 0 var(--s-5) 0;
}
.default-body :deep(h1:first-child + h2) {
  color: var(--fg-muted);
  font-size: var(--t-h3);
  font-weight: 500;
  margin: calc(-1 * var(--s-4)) 0 var(--s-5) 0;
}
</style>
