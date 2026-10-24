<script setup lang="ts">
defineProps<{
  n: string | number
  title: string
  hint?: string
}>()
</script>

<template>
  <div class="numbered-cell">
    <div class="n">{{ String(n).padStart(2, '0') }}</div>
    <div class="t">{{ title }}</div>
    <div v-if="hint" class="h">{{ hint }}</div>
  </div>
</template>

<style scoped>
.numbered-cell .n {
  color: var(--accent);
  font-size: var(--t-h1);
  line-height: 1;
  font-weight: 700;
  margin-bottom: var(--s-4);
}
.numbered-cell .t {
  color: var(--fg);
  font-size: var(--t-h3);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.numbered-cell .h {
  margin-top: var(--s-3);
  color: var(--fg-dim);
  font-size: var(--t-small);
  line-height: 1.3;
}
</style>
