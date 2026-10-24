<script setup lang="ts">
/**
 * How one camp answers all four blind domains. Three states, and the third one
 * matters: a camp can solve a domain, fail it, or never even try — "игнорирует"
 * is a different statement from "не решается", and the reason column is where
 * the actual content lives.
 */
interface Row {
  name: string
  /** yes = решается · no = не решается · skip = игнорирует (и правильно делает) */
  state: 'yes' | 'no' | 'skip'
  note: string
  /** yes-with-an-asterisk: решается, но с оговоркой, которую легко принять за чистое «да» */
  caveat?: boolean
}

defineProps<{ rows: Row[] }>()

const label = { yes: 'решается', no: 'не решается', skip: 'игнорирует' } as const
</script>

<template>
  <div class="verdict">
    <div v-for="r in rows" :key="r.name" v-click class="row" :class="[r.state, { caveat: r.caveat }]">
      <div class="name">{{ r.name }}</div>
      <div class="state">
        <carbon-checkmark v-if="r.state === 'yes'" class="ico" />
        <carbon-close v-else-if="r.state === 'no'" class="ico" />
        <carbon-subtract v-else class="ico" />
        <span>{{ label[r.state] }}<template v-if="r.caveat">&nbsp;!</template></span>
      </div>
      <div class="note">{{ r.note }}</div>
    </div>
  </div>
</template>

<style scoped>
.verdict {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.row {
  display: grid;
  grid-template-columns: 7em 8.5em minmax(0, 1fr);
  align-items: center;
  gap: var(--s-4);
  border-left: 3px solid var(--border-hi);
  padding: 5px 0 5px var(--s-4); /* was --s-2: a «name · pattern» line above the rows (10.10) needs the height */
}
.row.yes { border-left-color: var(--success); }
.row.no { border-left-color: var(--danger); }
.row.skip { border-left-color: var(--border-hi); }
.row.caveat { border-left-color: var(--caveat); }

.name {
  font-weight: 600;
  font-size: var(--t-h3);
}
.state {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.ico {
  font-size: 20px;
  flex-shrink: 0;
}
.yes .state { color: var(--success); }
.no .state { color: var(--danger); }
.skip .state { color: var(--fg-dim); }
.caveat .state { color: var(--caveat); }

.note {
  color: var(--fg-muted);
  font-size: var(--t-small);
  min-width: 0;
}
.caveat .note {
  color: var(--caveat);
}
</style>
