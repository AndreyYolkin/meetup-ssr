<script setup lang="ts">
defineProps<{
  handle?: string
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout intro flex flex-col justify-center h-full relative">
    <Mark v-if="mark !== false" />
    <div class="intro-grid" :class="{ 'has-media': !!$slots.media }">
      <div class="intro-content">
        <slot />
      </div>
      <div v-if="$slots.media" class="intro-media">
        <slot name="media" />
      </div>
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
.intro-content {
  max-width: 900px;
}
.intro-grid.has-media {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: var(--s-6);
  align-items: center;
}
.intro :slotted(h1) {
  font-size: 56px;
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.intro :slotted(h3) {
  color: var(--fg-dim);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: var(--t-small);
  margin-top: var(--s-4);
  margin-bottom: 0;
}
</style>
