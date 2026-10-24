<script setup lang="ts">
import { computed } from 'vue'
import { renderSVG } from 'uqr'

const props = defineProps<{
  value: string
  size?: number
}>()

const svg = computed(() => renderSVG(props.value, { border: 2 }))
</script>

<template>
  <a
    :href="value"
    target="_blank"
    class="qr-code block"
    :style="{ width: `${size ?? 72}px`, height: `${size ?? 72}px` }"
    v-html="svg"
  />
</template>

<style scoped>
.qr-code {
  border-radius: var(--r-sm);
  overflow: hidden;
}
.qr-code :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
