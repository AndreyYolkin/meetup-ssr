<script setup lang="ts">
defineProps<{
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout compare flex flex-col h-full">
    <Mark v-if="mark !== false" />
    <header v-if="$slots.title" class="mb-[var(--s-5)]">
      <h1 class="compare-title">
        <slot name="title" />
      </h1>
    </header>
    <div class="flex-1 flex items-center">
      <div class="grid grid-cols-2 gap-[var(--s-7)] w-full">
        <div class="compare-side is-pro">
          <slot name="before" />
        </div>
        <div class="compare-side is-con">
          <slot name="after" />
        </div>
      </div>
    </div>
    <footer v-if="$slots.footer" class="compare-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.compare-title {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0;
}

.compare-footer {
  margin-top: var(--s-5);
  color: var(--fg-muted);
  font-size: var(--t-body);
}
.compare-footer :deep(p) {
  margin: 0;
  font-size: inherit;
  color: inherit;
}
.compare-footer :deep(strong) {
  color: var(--fg);
}

/* Each slot renders its heading paragraph first, then item paragraphs.
   Wrapping keeps the two slots as two real columns instead of letting
   every <p> flow into a single shared grid. */
.compare-side {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
}

/* Column heading — the leading **bold** paragraph of each slot. */
.compare-side :deep(p:first-child) {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  margin: 0 0 var(--s-2);
  padding: 6px 14px 6px 10px;
  border-radius: 999px;
  font-size: var(--t-small);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.compare-side :deep(p:first-child)::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
}
.is-pro :deep(p:first-child) {
  color: var(--success);
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.28);
}
.is-con :deep(p:first-child) {
  color: var(--danger);
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.28);
}

/* Item rows — every paragraph after the heading. */
.compare-side :deep(p:not(:first-child)) {
  position: relative;
  margin: 0;
  padding: var(--s-4) var(--s-5) var(--s-4) calc(var(--s-6) + var(--s-5));
  border-radius: var(--r-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: var(--t-body);
  line-height: 1.4;
  color: var(--fg);
}
.compare-side :deep(p:not(:first-child))::before {
  position: absolute;
  left: var(--s-4);
  top: var(--s-4);
  width: 26px;
  height: 26px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
}
.is-pro :deep(p:not(:first-child))::before {
  content: "✓";
  color: var(--success);
  background: rgba(74, 222, 128, 0.14);
  border: 1px solid rgba(74, 222, 128, 0.30);
}
.is-con :deep(p:not(:first-child))::before {
  content: "✕";
  color: var(--danger);
  background: rgba(248, 113, 113, 0.14);
  border: 1px solid rgba(248, 113, 113, 0.30);
}
</style>
