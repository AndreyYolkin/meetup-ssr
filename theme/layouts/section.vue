<script setup lang="ts">
defineProps<{
  prefix?: string
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout section flex flex-col justify-center h-full relative">
    <Mark v-if="mark !== false" />
    <div v-if="prefix" class="text-fg-dim text-sm uppercase tracking-[0.1em] font-mono mt-[var(--s-5)] mb-[var(--s-1)]">
      {{ prefix }}
    </div>
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-content {
  max-width: 900px;
}
.section :slotted(h1) {
  font-size: 56px;
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.section :slotted(h3) {
  color: var(--fg-muted);
  font-size: var(--t-h2);
  font-weight: 500;
  margin-top: var(--s-4);
  margin-bottom: 0;
}
</style>
