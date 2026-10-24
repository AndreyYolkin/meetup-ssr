<script setup lang="ts">
import { computed } from 'vue'

interface BorderBeamProps {
  size?: number
  duration?: number
  borderWidth?: number
  borderRadius?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 200,
  duration: 8,
  anchor: 90,
  borderRadius: 0,
  borderWidth: 1.5,
  colorFrom: '#787EFF',
  colorTo: '#9AA0FF',
  delay: 0,
})

const durationInSeconds = computed(() => `${props.duration}s`)
const delayInSeconds = computed(() => `${props.delay}s`)
</script>

<template>
  <div class="border-beam pointer-events-none absolute inset-0 rounded-[inherit]" />
</template>

<style scoped>
.border-beam {
  --size: v-bind(size);
  --duration: v-bind(durationInSeconds);
  --anchor: v-bind(anchor);
  --border-width: v-bind(borderWidth);
  --color-from: v-bind(colorFrom);
  --color-to: v-bind(colorTo);
  --delay: v-bind(delayInSeconds);
  --border-radius: v-bind(borderRadius);

  border: calc(var(--border-width) * 1px) solid transparent;
  mask:
    linear-gradient(transparent, transparent),
    linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  border-radius: calc(var(--border-radius) * 1px);
  -webkit-mask-composite: source-in;
}

.border-beam::after {
  content: '';
  position: absolute;
  aspect-ratio: 1 / 1;
  width: calc(var(--size) * 1px);
  animation: border-beam-anim var(--duration) infinite linear;
  animation-delay: var(--delay);
  background: linear-gradient(
    to left,
    var(--color-from),
    var(--color-to),
    transparent
  );
  offset-anchor: calc(var(--anchor) * 1%) 50%;
  offset-path: rect(0 auto auto 0 round calc(var(--size) * 1px));
}

@keyframes border-beam-anim {
  to {
    offset-distance: 100%;
  }
}
</style>
