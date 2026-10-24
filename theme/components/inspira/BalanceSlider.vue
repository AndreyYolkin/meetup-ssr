<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number
  leftLabel?: string
  rightLabel?: string
  leftColor?: string
  rightColor?: string
  indicatorColor?: string
  borderRadius?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: 50,
  leftLabel: 'LEFT',
  rightLabel: 'RIGHT',
  leftColor: '#787EFF',
  rightColor: 'rgba(255, 255, 255, 0.08)',
  indicatorColor: '#FFFFFF',
  borderRadius: 8,
})

const sliderStyles = computed(() => ({
  '--value': String(props.value),
  '--leftContent': `"${props.leftLabel} "`,
  '--rightContent': `" ${props.rightLabel}"`,
  '--indicatorColor': props.indicatorColor,
  '--leftColor': props.leftColor,
  '--rightColor': props.rightColor,
}))

const borderRadiusInPx = computed(() => `${props.borderRadius}px`)

function hexToHsl(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, '')
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h * 360, s * 100, l * 100]
}
</script>

<template>
  <div class="slider-container" :style="sliderStyles">
    <div class="slider-value-labels" aria-hidden="true">
      <div class="label-cell label-left">
        <span class="label-text">{{ leftLabel }}</span>
        <span class="label-value">{{ value }}%</span>
      </div>
      <div class="label-cell label-right">
        <span class="label-value">{{ 100 - value }}%</span>
        <span class="label-text">{{ rightLabel }}</span>
      </div>
    </div>
    <div class="slider-track">
      <div class="bar-left" />
      <div class="slider-indicator" />
    </div>
  </div>
</template>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 64px;
  margin: 0 auto;
  display: grid;
  place-items: center;
  --anim: 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.slider-value-labels {
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.label-cell {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4em;
  font-variant: tabular-nums;
}

.label-text {
  opacity: 0.5;
  font-weight: 600;
}
.label-value {
  opacity: 1;
  font-weight: 700;
}

.label-left .label-text,
.label-left .label-value {
  color: v-bind('props.leftColor');
}
.label-right .label-text,
.label-right .label-value {
  color: var(--fg);
}

.slider-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  border-radius: v-bind(borderRadiusInPx);
  overflow: hidden;
  background: var(--rightColor);
}

.bar-left {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(var(--value, 0) * 1%);
  background: var(--leftColor);
  transition: width var(--anim), background var(--anim);
}

.slider-indicator {
  position: absolute;
  top: 50%;
  left: calc(var(--value, 0) * 1%);
  transform: translate(-50%, -50%);
  width: 3px;
  height: 75%;
  z-index: 2;
  border-radius: 2px;
  background: var(--indicatorColor);
  transition: left var(--anim);
}
</style>
