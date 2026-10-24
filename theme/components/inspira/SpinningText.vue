<script lang="ts" setup>
import { Motion } from 'motion-v'
import { computed } from 'vue'

interface Props {
  text: string
  duration?: number
  reverse?: boolean
  radius?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 10,
  radius: 5,
})

const letters = computed(() => {
  const list = props.text.split('')
  list.push(' ')
  return list
})

const containerVariants = computed(() => ({
  hidden: { rotate: 0 },
  visible: { rotate: props.reverse ? -360 : 360 },
}))

const transition = computed(() => ({
  repeat: Infinity,
  ease: 'linear',
  duration: props.duration,
}))
</script>

<template>
  <Motion
    as="div"
    initial="hidden"
    animate="visible"
    :variants="containerVariants"
    :transition="transition"
    class="relative"
  >
    <span
      v-for="(letter, index) in letters"
      :key="`${letter}-${index}`"
      class="absolute top-1/2 left-1/2"
      :style="{
        '--index': index,
        '--total': letters.length,
        '--radius': radius,
        transform: `translate(-50%, -50%) rotate(calc(360deg / var(--total) * var(--index))) translateY(calc(var(--radius, 5) * -1ch))`,
        transformOrigin: 'center',
      }"
    >
      {{ letter }}
    </span>
  </Motion>
</template>
