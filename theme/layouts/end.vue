<script setup lang="ts">
defineProps<{
  handle?: string
  mark?: boolean
  qr?: string
  qrLabel?: string
}>()
</script>

<template>
  <div class="slidev-layout end flex flex-col items-start justify-center h-full relative" :class="{ 'has-qr': !!qr }">
    <Mark v-if="mark !== false" />
    <div class="end-content">
      <slot />
    </div>
    <div v-if="qr" class="end-qr">
      <img :src="qr" alt="QR-код со ссылкой на слайды" />
      <span v-if="qrLabel" class="font-mono text-sm text-fg-dim">{{ qrLabel }}</span>
    </div>
    <footer
      class="absolute bottom-[var(--slide-pad)] left-[var(--slide-pad)] right-[var(--slide-pad)] flex items-center justify-between text-fg-dim text-sm"
    >
      <div class="flex items-center gap-4">
        <span v-if="$slidev?.configs?.author">{{ $slidev.configs.author }}</span>
        <span v-if="handle" class="font-mono">{{ handle }}</span>
      </div>
      <span class="font-mono">{{ $nav.currentSlideNo }} / {{ $nav.total }}</span>
    </footer>
  </div>
</template>

<style scoped>
.end-content {
  max-width: 900px;
}
.end.has-qr .end-content {
  max-width: 560px;
}
.end-qr {
  position: absolute;
  right: var(--slide-pad);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-3);
}
.end-qr img {
  display: block;
  width: 200px;
  height: 200px;
  padding: 12px;
  background: #fff;
  border-radius: var(--r-md);
}
.end :slotted(h1) {
  font-size: 56px;
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.end :slotted(p) {
  color: var(--fg-muted);
  font-size: var(--t-h3);
  margin-top: var(--s-5);
  max-width: 28em;
}
</style>
