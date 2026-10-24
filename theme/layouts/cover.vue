<script setup lang="ts">
defineProps<{
  prefix?: string
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout cover grid grid-cols-12 gap-[var(--s-6)] h-full items-center relative">
    <div class="col-span-7 flex flex-col justify-center">
      <Mark v-if="mark !== false" />
      <div
        v-if="prefix"
        class="text-fg-dim text-sm uppercase tracking-[0.1em] font-mono mt-[var(--s-2)] mb-[var(--s-3)]"
      >
        {{ prefix }}
      </div>
      <div class="cover-content">
        <slot />
      </div>
    </div>
    <div class="col-span-5 flex items-center justify-center">
      <slot name="media" />
    </div>
  </div>
</template>

<style scoped>
.cover :slotted(h1) {
  font-size: 56px;
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.cover :slotted(h2),
.cover :slotted(h3) {
  color: var(--fg-muted);
  font-size: var(--t-h3);
  font-weight: 500;
  margin-top: var(--s-3);
  margin-bottom: 0;
}
.cover :slotted(p) {
  color: var(--fg-muted);
  margin-top: var(--s-4);
  max-width: 28em;
}
</style>
