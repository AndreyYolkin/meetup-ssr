<script setup lang="ts">
import { TransitionPresets, useElementVisibility, useTransition } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

interface NumberTickerProps {
  value?: number
  direction?: 'up' | 'down'
  duration?: number
  delay?: number
  decimalPlaces?: number
}

const props = withDefaults(defineProps<NumberTickerProps>(), {
  value: 0,
  direction: 'up',
  delay: 0,
  duration: 1200,
  decimalPlaces: 0,
})

const spanRef = ref<HTMLSpanElement>()
const transitionValue = ref(props.direction === 'down' ? props.value : 0)

const transitionOutput = useTransition(transitionValue, {
  delay: props.delay,
  duration: props.duration,
  transition: TransitionPresets.easeOutCubic,
})

const output = computed(() => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: props.decimalPlaces,
    maximumFractionDigits: props.decimalPlaces,
  }).format(Number(transitionOutput.value.toFixed(props.decimalPlaces)))
})

const isInView = useElementVisibility(spanRef, { threshold: 0 })
const hasBeenInView = ref(false)

const stop = watch(
  isInView,
  (visible) => {
    if (visible && !hasBeenInView.value) {
      hasBeenInView.value = true
      transitionValue.value = props.direction === 'down' ? 0 : props.value
      stop()
    }
  },
  { immediate: true },
)

watch(
  () => props.value,
  (newVal) => {
    if (hasBeenInView.value) {
      transitionValue.value = props.direction === 'down' ? 0 : newVal
    }
  },
)
</script>

<template>
  <span ref="spanRef" class="inline-block tabular-nums">{{ output }}</span>
</template>
