<script setup lang="ts">
/**
 * A conventional network sequence diagram: vertical lifelines, horizontal
 * messages, solid for requests and dashed for responses — the shape the room
 * already recognises. Replaces the stacks of left/right cards that reviewers
 * read as a list rather than as an exchange over time.
 *
 * Every message sits behind its own v-click, so the exchange is narrated step by
 * step instead of landing on the room all at once.
 */
interface Step {
  /** Actor index the message leaves from. */
  from: number
  /** Actor index it arrives at. Equal to `from` renders a self-loop. */
  to: number
  label: string
  /** Dimmed tail after the label — the aside, not the payload. */
  note?: string
  /** Highlight this message: the hint, the redirect, the payoff. */
  tone?: 'accent' | 'success' | 'danger'
  /** Caption in the gap above this message — a break in time, e.g. «следующий заход». */
  before?: string
}

/** Brace on the right spanning steps `from..to` (indices) — the cost of the exchange, e.g. «+1 RTT». */
interface Bracket {
  from: number
  to: number
  label: string
}

defineProps<{
  actors: string[]
  steps: Step[]
  bracket?: Bracket
}>()

/** Must match .seq-step height and .seq-body gap (--s-6) below. */
const STEP_H = 34
const STEP_GAP = 32

/**
 * Lifeline x-positions. Pushed out to 12 % / 88 % (not the column centres at
 * 25 % / 75 %): the message labels are nowrap, and «200 · Accept-CH:
 * Sec-CH-Prefers-Color-Scheme» did not fit between the lifelines at half the
 * width — a 23.09 run finding. Actors sit on the same x.
 */
const pct = (i: number, n: number) => n === 1 ? 50 : 12 + (i / (n - 1)) * 76
</script>

<template>
  <div class="seq" :style="{ '--cols': actors.length }">
    <div class="seq-actors">
      <div
        v-for="(a, i) in actors"
        :key="a"
        class="seq-actor"
        :style="{ left: `${pct(i, actors.length)}%` }"
      >{{ a }}</div>
    </div>

    <div class="seq-body">
      <div
        v-for="(a, i) in actors"
        :key="`life-${i}`"
        class="seq-lifeline"
        :style="{ left: `${pct(i, actors.length)}%` }"
      />

      <div
        v-for="(s, i) in steps"
        :key="`step-${i}`"
        v-click
        class="seq-step"
        :class="{ 'has-before': s.before }"
      >
        <div v-if="s.before" class="seq-before">{{ s.before }}</div>
        <!-- Self-loop: leaves a lifeline and comes back to it. -->
        <template v-if="s.from === s.to">
          <div
            class="seq-self"
            :class="s.tone"
            :style="{ left: `${pct(s.from, actors.length)}%` }"
          >
            <span class="seq-label">{{ s.label }}<em v-if="s.note">&nbsp;{{ s.note }}</em></span>
          </div>
        </template>

        <template v-else>
          <div
            class="seq-msg"
            :class="[s.tone, s.to > s.from ? 'fwd' : 'back']"
            :style="{
              left: `${Math.min(pct(s.from, actors.length), pct(s.to, actors.length))}%`,
              width: `${Math.abs(pct(s.to, actors.length) - pct(s.from, actors.length))}%`,
            }"
          >
            <span class="seq-label">{{ s.label }}<em v-if="s.note">&nbsp;{{ s.note }}</em></span>
            <span class="seq-line" />
          </div>
        </template>

        <!-- Lands with its last step, so the cost shows once the exchange it measures is complete. -->
        <div
          v-if="bracket && bracket.to === i"
          class="seq-bracket"
          :style="{
            left: `${pct(actors.length - 1, actors.length)}%`,
            height: `${(bracket.to - bracket.from) * (STEP_H + STEP_GAP) + STEP_H}px`,
          }"
        >
          <span>{{ bracket.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.seq {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.seq-actors {
  position: relative;
  height: 38px;
}
.seq-actor {
  position: absolute;
  top: 0;
  text-align: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--fg);
  border: 1px solid var(--border-hi);
  background: var(--surface-hi);
  border-radius: var(--r-md);
  padding: var(--s-2) var(--s-3);
  transform: translateX(-50%);
  min-width: 9em;
}

.seq-body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--s-6);
  padding-top: var(--s-5);
}

.seq-lifeline {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 2px dashed var(--border-hi);
  transform: translateX(-1px);
}

.seq-step {
  position: relative;
  height: 34px;
}
.seq-msg,
.seq-self {
  transition: opacity 0.3s ease;
}
/* Earlier messages step back so the room reads the one just narrated; the bracket stays lit. */
.slidev-vclick-prior > .seq-msg,
.slidev-vclick-prior > .seq-self {
  opacity: 0.35;
}

/* Message */
.seq-msg {
  position: absolute;
  top: 0;
  height: 34px;
}
.seq-label {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--fg);
  background: var(--bg);
  padding: 0 var(--s-3);
}
.seq-label em {
  font-style: normal;
  color: var(--fg-dim);
}

.seq-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 2px solid var(--fg-muted);
  /* Draw-in from sender to receiver; clip-path keeps the arrowhead undistorted. */
  clip-path: inset(-10px -12px -10px -12px);
  transition: clip-path 0.45s cubic-bezier(0.3, 0, 0.2, 1);
}
.seq-msg .seq-label {
  transition: opacity 0.25s ease 0.3s;
}
.slidev-vclick-hidden .fwd .seq-line {
  clip-path: inset(-10px 100% -10px -12px);
}
.slidev-vclick-hidden .back .seq-line {
  clip-path: inset(-10px -12px -10px 100%);
}
.slidev-vclick-hidden .seq-msg .seq-label {
  opacity: 0;
  transition-delay: 0s;
}
.seq-line::after {
  content: "";
  position: absolute;
  top: -7px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}
.fwd .seq-line::after {
  right: -1px;
  border-left: 10px solid var(--fg-muted);
}
.back .seq-line::after {
  left: -1px;
  border-right: 10px solid var(--fg-muted);
}
/* Responses come back dashed, like every sequence diagram the room has seen. */
.back .seq-line {
  border-top-style: dashed;
}

/* Self-loop: out and straight back into the same lifeline. */
.seq-self {
  position: absolute;
  top: 0;
  width: 92px;
  height: 30px;
  border: 2px solid var(--fg-muted);
  border-left: none;
  border-radius: 0 var(--r-md) var(--r-md) 0;
}
.seq-self::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: -1px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 10px solid var(--fg-muted);
}
.seq-self .seq-label {
  left: auto;
  right: -1em;
  bottom: 50%;
  transform: translate(100%, 50%);
}

/* Time break: gets a row of its own above its step, spans the lifelines.
   The extra margin is not in the bracket height maths — don't span a bracket across a break. */
.seq-step.has-before {
  margin-top: var(--s-6);
}
.seq-before {
  position: absolute;
  top: calc(-1 * var(--s-6) - 12px);
  left: 12%;
  right: 12%;
  display: flex;
  align-items: center;
  gap: var(--s-3);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--fg-dim);
  white-space: nowrap;
}
.seq-before::before,
.seq-before::after {
  content: "";
  flex: 1;
  border-top: 1px dashed var(--border-hi);
}

/* Bracket: a right-hand brace past the last lifeline, bottom-aligned to its last step. */
.seq-bracket {
  position: absolute;
  bottom: 0;
  margin-left: var(--s-4);
  width: 10px;
  border: 2px solid var(--caveat);
  border-left: none;
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
}
.seq-bracket span {
  position: absolute;
  top: 50%;
  left: calc(100% + var(--s-2));
  transform: translateY(-50%);
  white-space: nowrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--caveat);
}

/* Tones */
.accent .seq-line,
.accent.seq-self {
  border-color: var(--accent);
}
.accent .seq-line::after { border-left-color: var(--accent); border-right-color: var(--accent); }
.accent.seq-self::after { border-right-color: var(--accent); }
.accent .seq-label { color: var(--accent); }

.success .seq-line,
.success.seq-self {
  border-color: var(--success);
}
.success .seq-line::after { border-left-color: var(--success); border-right-color: var(--success); }
.success.seq-self::after { border-right-color: var(--success); }
.success .seq-label { color: var(--success); }

.danger .seq-line,
.danger.seq-self {
  border-color: var(--danger);
}
.danger .seq-line::after { border-left-color: var(--danger); border-right-color: var(--danger); }
.danger.seq-self::after { border-right-color: var(--danger); }
.danger .seq-label { color: var(--danger); }
</style>
