<script setup lang="ts">
defineProps<{
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout bullets flex flex-col h-full">
    <header class="mb-[var(--s-4)]">
      <Mark v-if="mark !== false" />
      <h1 class="bullets-title">
        <slot name="title" />
      </h1>
    </header>
    <div class="bullets-body flex-1 min-h-0 flex flex-col justify-start mt-[var(--s-4)]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bullets-title {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  text-wrap: balance;
  margin: 0;
}
.bullets-body :deep(ul) {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  margin: 0;
}
.bullets-body :deep(li) {
  font-size: var(--t-h3);
  color: var(--fg);
  padding-left: var(--s-5);
  position: relative;
  line-height: 1.4;
}
.bullets-body :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent);
}
.bullets-body :deep(pre) {
  max-height: 100%;
  overflow: auto;
  padding: var(--s-4);
  font-size: var(--t-mono);
  line-height: 1.5;
}
.bullets-body :deep(ul + pre),
.bullets-body :deep(pre + ul) {
  margin-top: var(--s-5);
}
</style>
