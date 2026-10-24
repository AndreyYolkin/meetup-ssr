<script setup lang="ts">
interface Item { n: string | number; title: string; hint?: string }
defineProps<{
  items: Item[]
  mark?: boolean
  // Brackets items `from..to` (1-based) under one label, e.g. two alternative acts.
  group?: { from: number; to: number; label: string }
}>()
</script>

<template>
  <div class="slidev-layout numbered-toc flex flex-col h-full">
    <Mark v-if="mark !== false" />
    <header v-if="$slots.title">
      <h1 class="toc-title">
        <slot name="title" />
      </h1>
      <!-- Reviewers wanted the goal of the talk on screen, not just spoken. -->
      <p v-if="$slots.goal" class="toc-goal">
        <slot name="goal" />
      </p>
    </header>
    <div class="flex-1 flex flex-col justify-center">
      <div
        class="toc-grid grid justify-between gap-x-[var(--s-5)]"
        :style="{ gridTemplateColumns: `repeat(${items.length}, auto)` }"
      >
        <div
          v-if="group"
          class="toc-group"
          :style="{ gridColumn: `${group.from} / ${group.to + 1}` }"
        >
          <span class="font-mono">{{ group.label }}</span>
        </div>
        <NumberedCell
          v-for="it in items"
          :key="String(it.n)"
          :n="it.n"
          :title="it.title"
          :hint="it.hint"
          style="grid-row: 2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toc-title {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0;
}
.toc-goal {
  margin: var(--s-4) 0 0;
  font-size: var(--t-h3);
  line-height: 1.4;
  color: var(--fg-muted);
  max-width: 34em;
}
.toc-goal :deep(strong) {
  color: var(--fg);
}
.toc-grid {
  grid-template-rows: auto auto;
}
/* Bracket: a thin line with end ticks, label sitting on it. */
.toc-group {
  grid-row: 1;
  position: relative;
  height: 12px;
  margin-bottom: var(--s-5);
  border: 2px solid color-mix(in srgb, var(--fg) 40%, var(--bg));
  border-bottom: 0;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
}
.toc-group span {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -55%);
  padding: 0 var(--s-3);
  background: var(--bg);
  font-size: var(--t-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--fg-muted);
  white-space: nowrap;
}
</style>
