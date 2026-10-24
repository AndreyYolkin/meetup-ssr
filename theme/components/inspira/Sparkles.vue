<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{ count?: number }>(), {
  count: 24,
})

interface Spark {
  x: string
  y: string
  size: number
  delay: string
  dur: string
  color: string
}

const COLORS = ['var(--accent)', 'var(--accent-hi)', 'rgba(255,255,255,0.9)']

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// Randomize on mount only — avoids re-rolling every render and any SSR mismatch.
const sparks = ref<Spark[]>([])

onMounted(() => {
  sparks.value = Array.from({ length: props.count }, () => ({
    x: `${rand(0, 100).toFixed(2)}%`,
    y: `${rand(0, 100).toFixed(2)}%`,
    size: +rand(8, 18).toFixed(1),
    delay: `${rand(0, 3).toFixed(2)}s`,
    dur: `${rand(1.6, 3.4).toFixed(2)}s`,
    color: COLORS[Math.floor(rand(0, COLORS.length))],
  }))
})
</script>

<template>
  <svg
    v-for="(s, i) in sparks"
    :key="`spark-${i}`"
    class="spark"
    :style="{
      left: s.x,
      top: s.y,
      width: `${s.size}px`,
      height: `${s.size}px`,
      animationDelay: s.delay,
      animationDuration: s.dur,
    }"
    viewBox="0 0 21 21"
  >
    <path
      d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
      :fill="s.color"
    />
  </svg>
</template>

<style scoped>
.spark {
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  animation-name: twinkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(90deg);
  }
}
</style>
