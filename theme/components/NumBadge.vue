<script setup lang="ts">
// Resolution marker ①–⑤ from the decision tree. Uses a plain digit inside a CSS
// circle rather than U+2460 ①②③④⑤ — those glyphs bring their own drawn circle
// and their own baseline, usually out of a fallback font, and never centre.
withDefaults(defineProps<{
  n: string | number
  danger?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), { size: 'md' })
</script>

<template>
  <span class="num-badge" :class="[size, { danger }]">{{ n }}</span>
</template>

<style scoped>
.num-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--surface-hi);
  border: 1px solid var(--border-hi);
  color: var(--accent);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  vertical-align: middle;
}
.num-badge.danger {
  color: var(--danger);
  border-color: color-mix(in srgb, var(--danger) 45%, transparent);
}
.sm {
  width: 26px;
  height: 26px;
  font-size: var(--t-small);
}
.md {
  width: 34px;
  height: 34px;
  font-size: var(--t-h3);
}
.lg {
  width: 44px;
  height: 44px;
  font-size: var(--t-h2);
}
</style>
