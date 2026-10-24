<script setup lang="ts">
defineProps<{
  sparkles?: boolean
  water?: boolean
  wide?: boolean
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout statement flex flex-col items-start justify-center h-full relative">
    <div v-if="sparkles" class="sparkles-bg">
      <Sparkles :count="26" />
    </div>
    <template v-if="water">
      <WaterBackground />
      <div class="water-scrim" />
    </template>
    <Mark v-if="mark !== false" class="relative z-10" />
    <div class="statement-content relative z-10" :class="{ 'statement-wide': wide }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.statement-content {
  max-width: 900px;
}
.statement-wide {
  max-width: none;
  width: 100%;
}
.sparkles-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.water-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgb(5 5 5 / 0.55), rgb(5 5 5 / 0.1) 70%);
}
.statement :slotted(h1) {
  font-size: 56px;
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.statement :slotted(h2) {
  color: var(--fg-dim);
}
.statement :slotted(p) {
  color: var(--fg-muted);
  font-size: var(--t-h3);
  margin-top: var(--s-5);
  max-width: 28em;
}
</style>
