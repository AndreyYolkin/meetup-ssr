<script setup lang="ts">
/**
 * The two ladders of the talk: A «отдать браузеру» (ways 1–3) and B «спросить
 * сервер» (ways 4–5). Way numbers and names come from theme/ways.ts — the same
 * ones as on the verdict slides, the matrix, the footer crumb and the
 * DecisionTree resolutions.
 *
 * `active` dims the other ladder: Act 02 opens with A lit, Act 03 re-shows the
 * same map with B lit. Omit it to show both at full strength.
 */
import { ways } from '../ways'

defineProps<{ active?: 'a' | 'b' }>()

const rungs = (ns: number[]) => ways.filter(w => ns.includes(w.n))

const ladders = [
  {
    key: 'a',
    name: 'А · отдать браузеру',
    when: 'единственный путь, если сервера на запрос нет',
    tone: 'ok',
    steps: rungs([1, 2, 3]),
  },
  {
    key: 'b',
    name: 'Б · спросить сервер',
    when: 'сервер рендерит на запрос и должен знать',
    tone: 'tax',
    steps: rungs([4, 5]),
  },
] as const
</script>

<template>
  <div class="map">
    <section
      v-for="l in ladders"
      :key="l.key"
      class="ladder"
      :class="[l.tone, { dim: active && active !== l.key }]"
    >
      <header class="head">
        <div class="name">{{ l.name }}</div>
        <div class="when">{{ l.when }}</div>
      </header>
      <ol class="steps">
        <li v-for="(s, i) in l.steps" :key="s.n" class="step">
          <div class="rung">
            <NumBadge :n="s.n" size="sm" />
            <div class="txt">
              <div class="label">{{ s.label }}</div>
              <div class="hint">{{ s.hint }}</div>
            </div>
          </div>
          <carbon-arrow-down v-if="i < l.steps.length - 1" class="arrow" />
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.map {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-7);
  align-items: start;
}
.ladder {
  --tone: var(--fg-muted);
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  transition: opacity 0.3s ease;
}
.ladder.ok { --tone: var(--success); }
.ladder.tax { --tone: var(--accent); }
.ladder.dim {
  opacity: 0.35;
}
.head {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: var(--s-3);
  border-bottom: 1px solid var(--border);
}
.name {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--tone);
}
.when {
  font-size: var(--t-small);
  color: var(--fg-muted);
}
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.rung {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  border: 1px solid var(--border-hi);
  border-radius: var(--r-md);
  background: var(--surface);
  padding: var(--s-2) var(--s-4) var(--s-2) var(--s-3);
}
.txt {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.label {
  font-weight: 600;
  font-size: var(--t-body);
  line-height: 1.3;
}
.hint {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 14px;
  color: var(--fg-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.arrow {
  align-self: center;
  font-size: 18px;
  color: var(--fg-dim);
  margin: 2px 0;
}
</style>
