<script setup lang="ts">
defineProps<{
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout two-cols flex flex-col h-full">
    <header v-if="$slots.title" class="mb-[var(--s-6)]">
      <Mark v-if="mark !== false" />
      <h1 class="two-cols-title">
        <slot name="title" />
      </h1>
    </header>
    <div class="grid grid-cols-2 gap-[var(--s-6)] flex-1 min-h-0">
      <div class="min-h-0 overflow-auto">
        <slot />
      </div>
      <div class="min-h-0 overflow-auto">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-cols-title {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
</style>
