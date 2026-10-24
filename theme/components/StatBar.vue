<script setup lang="ts">
defineProps<{
  value: string | number
  label: string
  suffix?: string
}>()
</script>

<template>
  <div class="stat-bar">
    <div class="stat-value">
      {{ value }}<span v-if="suffix" class="stat-suffix">{{ suffix }}</span>
    </div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stat-bar {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}
.stat-value {
  color: var(--accent);
  font-size: var(--t-display);
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.stat-suffix {
  color: var(--fg-muted);
  font-size: var(--t-h2);
  font-weight: 500;
  margin-left: 0.1em;
}
.stat-label {
  color: var(--fg-muted);
  font-size: var(--t-body);
}
</style>
