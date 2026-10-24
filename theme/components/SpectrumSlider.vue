<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number
  leftLabel?: string
  rightLabel?: string
  accent?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: 50,
  leftLabel: '',
  rightLabel: '',
  accent: 'var(--accent)',
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<template>
  <div class="spectrum">
    <div class="spectrum-labels">
      <span>{{ leftLabel }}</span>
      <span>{{ rightLabel }}</span>
    </div>
    <div class="spectrum-track">
      <div class="spectrum-fill" :style="{ width: `${clampedValue}%` }" />
      <div class="spectrum-indicator" :style="{ left: `${clampedValue}%` }" />
    </div>
  </div>
</template>

<style scoped>
.spectrum {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  width: 100%;
}
.spectrum-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: var(--fg-dim);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.spectrum-track {
  position: relative;
  height: 8px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.06);
  overflow: visible;
}
.spectrum-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(120, 126, 255, 0.2), v-bind('props.accent'));
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.spectrum-indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 22px;
  border-radius: 4px;
  background-color: var(--fg);
  box-shadow: 0 0 0 3px rgba(120, 126, 255, 0.35), 0 4px 16px rgba(120, 126, 255, 0.45);
  transition: left 1s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
