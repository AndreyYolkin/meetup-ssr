<script setup lang="ts">
import { ways } from '../ways'

defineProps<{ active?: number[] }>()

// Resolution = way («способ»), same numbers as the matrix and DecisionTree.
// Names come from theme/ways.ts. Vary is not a resolution any more (it is
// branch B's footer), so there is no danger item.
const items: { n: number; label: string; danger?: boolean }[] = ways.map(w => ({ n: w.n, label: w.short }))
</script>

<template>
  <div class="tree-legend">
    <div
      v-for="item in items"
      :key="item.n"
      class="tree-legend-item"
      :class="{ dim: active && !active.includes(item.n) }"
    >
      <span class="badge" :class="{ danger: item.danger }">{{ item.n }}</span>
      <span class="label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.tree-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-4);
  align-items: center;
}
.tree-legend-item {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  font-size: var(--t-small);
}
.tree-legend-item.dim {
  opacity: 0.4;
}
/* Plain digits, not U+2460 ①②③④⑤: those glyphs carry their own drawn circle
   and their own baseline metrics, usually from a fallback font, so they never
   sit centred inside a CSS circle. line-height:1 + tabular-nums keeps the
   optical centre exact. */
.badge {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: var(--surface-hi);
  border: 1px solid var(--border-hi);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--t-small);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
}
.badge.danger {
  color: var(--danger);
}
.label {
  color: var(--fg-dim);
  white-space: nowrap;
}
</style>
