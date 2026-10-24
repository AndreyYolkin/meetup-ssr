<script setup lang="ts">
defineProps<{
  label: string
  sublabel?: string
}>()
</script>

<template>
  <div class="compare-col">
    <div class="compare-head">
      <Chip>{{ label }}</Chip>
      <span v-if="sublabel" class="text-fg-muted text-sm uppercase tracking-wider font-mono ml-[var(--s-3)]">
        {{ sublabel }}
      </span>
    </div>
    <div class="compare-body card flex flex-col gap-[var(--s-3)]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.compare-col { display: flex; flex-direction: column; gap: var(--s-3); }
.compare-head { display: flex; align-items: center; }
.compare-body :deep(ul) { padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: var(--s-3); }
.compare-body :deep(li) { font-size: var(--t-body); color: var(--fg); }
</style>
