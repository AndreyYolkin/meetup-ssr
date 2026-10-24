<script setup lang="ts">
/**
 * Footer on every slide: a breadcrumb through the talk on the left, the slide
 * counter and QR codes on the right.
 *
 * The breadcrumb answers «where am I» after the 23.09 run, where the room lost
 * track of which act and which way was on screen. Acts come from the deck
 * itself: every `layout: section` slide whose `prefix` starts with «Акт» is one
 * crumb, and the current act is the last such slide at or before this one. The
 * way («способ») is explicit — `way: 3` in a slide's frontmatter — because a
 * way has no marker slide of its own; its name comes from theme/ways.ts.
 */
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { wayByN } from '../ways'

const { currentSlideNo, total, currentLayout, currentSlideRoute, slides } = useNav()

const fm = computed(() => (currentSlideRoute.value.meta?.slide?.frontmatter ?? {}) as Record<string, unknown>)
const qrLink = computed(() => fm.value.qrLink as string | undefined)
const qrLinks = computed(() => fm.value.qrLinks as { href: string, label: string }[] | undefined)

const acts = computed(() => slides.value
  .map((s) => {
    const f = (s.meta?.slide?.frontmatter ?? {}) as Record<string, unknown>
    const prefix = typeof f.prefix === 'string' ? f.prefix : ''
    return f.layout === 'section' && /^Акт\s*\d/.test(prefix)
      ? { no: s.no, n: prefix.replace(/^Акт\s*/, ''), title: s.meta?.slide?.title ?? '' }
      : null
  })
  .filter((a): a is { no: number, n: string, title: string } => a !== null))

/** First slide of the backup section, if any — no crumbs from there on. */
const backupFrom = computed(() => slides.value.find((s) => {
  const f = (s.meta?.slide?.frontmatter ?? {}) as Record<string, unknown>
  return f.layout === 'section' && f.prefix === 'Backup'
})?.no ?? Infinity)

const currentAct = computed(() => {
  if (currentSlideNo.value >= backupFrom.value) return undefined
  const past = acts.value.filter((a) => a.no <= currentSlideNo.value)
  return past.length ? past[past.length - 1] : undefined
})

const way = computed(() => {
  const n = fm.value.way
  return typeof n === 'number' && currentAct.value ? wayByN(n) : undefined
})

const hiddenLayouts = ['cover', 'intro', 'end']
</script>

<template>
  <footer
    v-if="!hiddenLayouts.includes(currentLayout as string) && fm.footer !== false"
    class="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-[var(--s-5)] px-8 py-4 text-sm text-fg-dim"
  >
    <!-- Other acts shrink to their numbers so the crumb never runs into the
         counter and QR codes on the right (it did at full length). -->
    <div class="flex items-center gap-[var(--s-3)] font-mono whitespace-nowrap min-w-0 overflow-hidden">
      <template v-if="currentAct">
        <span
          v-for="a in acts"
          :key="a.no"
          :class="a.no === currentAct.no ? 'text-fg' : 'text-fg-dim'"
        >{{ a.no === currentAct.no ? `${a.n} ${a.title}` : a.n }}</span>
        <span v-if="way" class="text-fg-dim">›</span>
        <span v-if="way" class="flex items-center gap-[var(--s-2)] text-fg">
          Способ <NumBadge :n="way.n" size="sm" />{{ way.label }}
        </span>
      </template>
    </div>
    <div class="flex items-end gap-[var(--s-3)] shrink-0">
      <span class="font-mono">{{ currentSlideNo }} / {{ total }}</span>
      <QrCode v-if="qrLink" :value="qrLink" />
      <div v-for="q in qrLinks" :key="q.href" class="flex flex-col items-center gap-[var(--s-1)]">
        <span class="font-mono text-xs">{{ q.label }}</span>
        <QrCode :value="q.href" />
      </div>
    </div>
  </footer>
</template>
