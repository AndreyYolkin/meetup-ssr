<script setup lang="ts">
/**
 * The talk's takeaway, drawn as a flowchart. One component, three frames:
 *
 *  - branch="a" / branch="b" — build frames, revealed click by click, in the
 *    trunk geometry proven to fit the 852×424 content box (3 stages × 99px + a
 *    footer band). A: A1 → A2 → A3, the cheapest rung first. B: starts at A3
 *    (already known to the room), its «нет» is the way into B1 → B2.
 *  - branch="both" — the photo frame, no clicks: the same trunk, all five gates
 *    in one column, compact. Each branch is a group with its cache cost on a
 *    bracket to the right. Hand-laid, like the build frames: a single spine is
 *    what the tree is now, a layout engine adds nothing.
 *
 * Node shapes carry the meaning, the way they do in any block diagram the room
 * has seen: chamfered accent hexagon = a question you answer, stadium = where
 * you land. Resolution numbers = camp numbers in the deck order — ① на клиенте ·
 * ② до paint · ③ ноль JS · ④ cookie · ⑤ Client Hints — so the legend on the
 * walkthroughs, the matrix and this chart say the same thing.
 *
 * Copy lives here rather than in slides.md: it is the canonical wording, reused
 * across the three walkthroughs.
 *
 * No root gate [23.09]. The tree is a ladder under one precondition — the
 * server does not know the value (SSR вслепую). Browser first, cheapest rung
 * first; every gate is yes/no with «yes» = stop here. The server (B) is where A
 * runs out: the first frame has to be right and the browser cannot make it so.
 * Every gate is answerable before entering the tree (A3 is a product
 * requirement, not a look at the HTML — accepted). The old root «Разметка одна
 * на всех?» was answered by different criteria on different walkthroughs.
 *
 * Cache footers: A produces one markup for everyone → cache intact (success).
 * B produces per-request variants → the value requires a cache policy: Vary for
 * a client hint that changes a shared response, private for a personalized
 * response based on a user profile.
 *
 * Clicks. a (7): A1 → ③ → A2 → ② → A3 → ① + ghost Б together → footer.
 * b (6): A3 already on screen → ghost ① → B1 → ④ → B2 → ⑤ + ④ together →
 * footer. Indices are explicit (`v-click="N"`): a nested v-click inside a
 * v-click is otherwise numbered out of document order.
 */
withDefaults(defineProps<{
  branch?: 'a' | 'b' | 'both'
}>(), { branch: 'both' })
</script>

<template>
  <!-- ====================== build frame · ветка А ====================== -->
  <div v-if="branch === 'a'" class="chart">
    <div v-click="1" class="stage">
      <div class="pipe is-start">
        <span class="pipe-label is-entry">значение, которого сервер не знает</span>
      </div>
      <div class="row">
        <div class="gate">
          <div class="gate-in">
            <span class="gate-n"><span>А1</span></span>
            Хватит CSS и разметки?
          </div>
        </div>
        <div v-click="2" class="branch">
          <span class="line"><span class="edge-label">да</span><span class="edge-note">CSS, srcset, нейтрально</span></span>
          <div class="res"><NumBadge n="3" size="sm" /> нативно · ноль JS</div>
        </div>
      </div>
    </div>

    <div v-click="3" class="stage">
      <div class="pipe">
        <span class="pipe-label">нет</span>
      </div>
      <div class="row">
        <div class="gate">
          <div class="gate-in">
            <span class="gate-n"><span>А2</span></span>
            Скрипт поправит до paint?
          </div>
        </div>
        <div v-click="4" class="branch">
          <span class="line"><span class="edge-label">да</span><span class="edge-note">атрибут, текст</span></span>
          <div class="res"><NumBadge n="2" size="sm" /> скрипт до paint</div>
        </div>
      </div>
    </div>

    <div v-click="5" class="stage">
      <div class="pipe">
        <span class="pipe-label">нет · другой DOM</span>
      </div>
      <div class="row">
        <div class="gate">
          <div class="gate-in">
            <span class="gate-n"><span>А3</span></span>
            Можно кадр без значения?
          </div>
        </div>
        <div v-click="6" class="fork">
          <span class="fork-stub" />
          <div class="fork-arms">
            <div class="arms">
              <div class="arm">
                <span class="line"><span class="edge-label">да</span><span class="edge-note">скелетон</span></span>
                <div class="res"><NumBadge n="1" size="sm" /> на клиенте</div>
              </div>
              <div class="arm">
                <span class="line"><span class="edge-label">нет</span></span>
                <div class="res is-ghost">Б · спросить сервер</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-click="7" class="foot is-ok">
      <span class="foot-label">ветка А</span>
      <span class="foot-body">одна разметка <span class="line foot-line" /> кэш цел</span>
    </div>
  </div>

  <!-- ====================== build frame · ветка Б ====================== -->
  <div v-else-if="branch === 'b'" class="chart">
    <div class="stage">
      <div class="pipe is-start">
        <span class="pipe-label is-entry">браузер не успел: А1 и А2 — нет</span>
      </div>
      <div class="row">
        <div class="gate">
          <div class="gate-in">
            <span class="gate-n"><span>А3</span></span>
            Можно кадр без значения?
          </div>
        </div>
        <div v-click="1" class="branch">
          <span class="line"><span class="edge-label">да</span><span class="edge-note">скелетон</span></span>
          <div class="res is-ghost">① на клиенте</div>
        </div>
      </div>
    </div>

    <div v-click="2" class="stage">
      <div class="pipe">
        <span class="pipe-label">нет · сервер должен знать</span>
      </div>
      <div class="row">
        <div class="gate">
          <div class="gate-in">
            <span class="gate-n"><span>Б1</span></span>
            Кто владелец значения?
          </div>
        </div>
        <div v-click="3" class="branch">
          <span class="line"><span class="edge-label">пользователь</span><span class="edge-note">выбрал сам</span></span>
          <div class="res"><NumBadge n="4" size="sm" /> cookie / профиль</div>
        </div>
      </div>
    </div>

    <div v-click="4" class="stage">
      <div class="pipe">
        <span class="pipe-label">устройство</span>
      </div>
      <div class="row">
        <div class="gate">
          <div class="gate-in">
            <span class="gate-n"><span>Б2</span></span>
            Есть Client Hint?
          </div>
        </div>
        <div v-click="5" class="fork">
          <span class="fork-stub" />
          <div class="fork-arms">
            <div class="arms">
              <div class="arm">
                <span class="line"><span class="edge-label">да</span><span class="edge-note">Chromium</span></span>
                <div class="res"><NumBadge n="5" size="sm" /> Client Hints + фолбэк</div>
              </div>
              <div class="arm">
                <span class="line"><span class="edge-label">нет</span><span class="edge-note">со 2-го визита</span></span>
                <div class="res"><NumBadge n="4" size="sm" /> cookie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-click="6" class="foot is-tax">
      <span class="foot-label">ветка Б</span>
      <span class="foot-body">хинт: <code>Vary</code> <span class="line foot-line" /> cache: <code>private</code></span>
    </div>
  </div>

  <!-- ====================== photo frame · целиком ====================== -->
  <!-- One trunk, two groups; each group's cache cost rides on a bracket. -->
  <div v-else class="chart is-photo">
    <div class="group is-ok">
      <div class="group-body">
        <div class="stage">
          <div class="pipe is-start" />
          <div class="row">
            <div class="gate"><div class="gate-in"><span class="gate-n"><span>А1</span></span>Хватит CSS и разметки?</div></div>
            <div class="branch">
              <span class="line"><span class="edge-label">да</span></span>
              <div class="res"><NumBadge n="3" size="sm" /> ноль JS</div>
            </div>
          </div>
        </div>
        <div class="stage">
          <div class="pipe"><span class="pipe-label">нет</span></div>
          <div class="row">
            <div class="gate"><div class="gate-in"><span class="gate-n"><span>А2</span></span>Скрипт поправит до paint?</div></div>
            <div class="branch">
              <span class="line"><span class="edge-label">да</span></span>
              <div class="res"><NumBadge n="2" size="sm" /> до paint</div>
            </div>
          </div>
        </div>
        <div class="stage">
          <div class="pipe"><span class="pipe-label">нет · другой DOM</span></div>
          <div class="row">
            <div class="gate"><div class="gate-in"><span class="gate-n"><span>А3</span></span>Можно кадр без значения?</div></div>
            <div class="branch">
              <span class="line"><span class="edge-label">да</span></span>
              <div class="res"><NumBadge n="1" size="sm" /> на клиенте</div>
            </div>
          </div>
        </div>
      </div>
      <div class="group-tag">
        <span class="group-name">А · отдать браузеру</span>
        <span class="group-cost">одна разметка<br>кэш цел</span>
      </div>
    </div>

    <div class="group is-tax">
      <div class="group-body">
        <div class="stage">
          <div class="pipe"><span class="pipe-label">нет · сервер должен знать</span></div>
          <div class="row">
            <div class="gate"><div class="gate-in"><span class="gate-n"><span>Б1</span></span>Кто владелец значения?</div></div>
            <div class="branch">
              <span class="line"><span class="edge-label">пользователь</span></span>
              <div class="res"><NumBadge n="4" size="sm" /> cookie</div>
            </div>
          </div>
        </div>
        <div class="stage">
          <div class="pipe"><span class="pipe-label">устройство</span></div>
          <div class="row">
            <div class="gate"><div class="gate-in"><span class="gate-n"><span>Б2</span></span>Есть Client Hint?</div></div>
            <div class="fork">
              <span class="fork-stub" />
              <div class="fork-arms">
                <div class="arms">
                  <div class="arm">
                    <span class="line"><span class="edge-label">да</span></span>
                    <div class="res"><NumBadge n="5" size="sm" /> Client Hints</div>
                  </div>
                  <div class="arm">
                    <span class="line"><span class="edge-label">нет</span></span>
                    <div class="res"><NumBadge n="4" size="sm" /> cookie</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="group-tag">
        <span class="group-name">Б · спросить сервер</span>
        <span class="group-cost">хинт: <code>Vary</code><br>cache: <code>private</code></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  /* Column geometry, referenced by every row below. */
  --gate-w: 360px;
  --res-w: 266px;
  --stub-w: 56px;
  /* Centre of the trunk: the gate's bottom vertex. */
  --trunk-x: 180px;
  /* Trunk segment. Long enough that the label sits under the gate it came from
     and still leaves bare line above the arrowhead. */
  --pipe-h: 46px;
  /* Radius of the fork's elbows. */
  --elbow: 14px;
  /* Opaque on purpose, NOT var(--fg-muted). Edges overlap wherever they join —
     stub into the fork's bus, arrowhead onto its own line, arrowhead onto the
     trunk — and with a translucent stroke every one of those joints stacks alpha
     and shows up as a lighter nick, which reads as a break in the line. Mixed
     against --bg it lands on the same grey. */
  --edge: color-mix(in srgb, var(--fg) 64%, var(--bg));
  --ok: var(--success);
  --tax: var(--danger);
}

/* ---------- trunk (build frames) ---------- */

.pipe {
  position: relative;
  height: var(--pipe-h);
  margin-left: calc(var(--trunk-x) - 1px);
  border-left: 2px solid var(--edge);
}
.pipe::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: -6px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 9px solid var(--edge);
}
.pipe.is-start::before {
  content: "";
  position: absolute;
  top: -4px;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--edge);
}
.pipe-label {
  position: absolute;
  top: -2px;
  left: var(--s-4);
  white-space: nowrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--fg-muted);
}
.pipe-label.is-entry {
  font-family: inherit;
  color: var(--fg-dim);
}

.row {
  display: grid;
  grid-template-columns: var(--gate-w) minmax(0, 1fr);
  align-items: center;
}

/* ---------- decision gate ---------- */

.gate {
  --ch: 13px;
  --clip: polygon(
    var(--ch) 0, calc(100% - var(--ch)) 0, 100% 50%,
    calc(100% - var(--ch)) 100%, var(--ch) 100%, 0 50%
  );
  clip-path: var(--clip);
  background: var(--accent);
  padding: 1.5px;
}
.gate-in {
  --ch: 12px;
  clip-path: var(--clip);
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-2) var(--s-6) var(--s-2) var(--s-4);
  font-size: var(--t-h3);
  font-weight: 600;
  white-space: nowrap;
}

/* A rotated square: the decision symbol, sized so its diagonal — not its box —
   sets the gate's height. */
.gate-n {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin: 0 6px;
  flex-shrink: 0;
  border-radius: 3px;
  background: var(--accent);
  transform: rotate(45deg);
}
.gate-n > span {
  transform: rotate(-45deg);
  color: var(--accent-on);
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
.gate-n.is-root {
  background: var(--fg);
}
.gate-n.is-root > span {
  color: var(--bg);
  font-size: var(--t-small);
}

/* ---------- edges ---------- */

.line {
  position: relative;
  align-self: center;
  height: 0;
  border-top: 2px solid var(--edge);
}
.line::after {
  content: "";
  position: absolute;
  top: -7px;
  right: -1px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid var(--edge);
}
/* The answer rides above its edge, the qualifier hangs under it; both start
   at the same x, so they never reach the arrowhead or the terminal. */
.edge-label,
.edge-note {
  position: absolute;
  left: var(--s-2);
  white-space: nowrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  line-height: 1;
}
.edge-label {
  bottom: 7px;
  font-size: var(--t-small);
  color: var(--fg);
}
.edge-note {
  top: 7px;
  font-size: var(--t-mono);
  color: var(--fg-dim);
}

.branch {
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--res-w);
  align-items: center;
}

.fork {
  display: flex;
  align-items: center;
  align-self: stretch;
}
.fork-stub {
  width: var(--stub-w);
  flex-shrink: 0;
  height: 0;
  border-top: 2px solid var(--edge);
}
.fork-arms {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
}
.arms {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.arms::before,
.arms::after {
  content: "";
  position: absolute;
  left: -1px;
  width: var(--elbow);
  height: calc(25% + 1px);
  border-left: 2px solid var(--edge);
}
.arms::before {
  top: calc(25% - 1px);
  border-top: 2px solid var(--edge);
  border-top-left-radius: var(--elbow);
}
.arms::after {
  top: 50%;
  border-bottom: 2px solid var(--edge);
  border-bottom-left-radius: var(--elbow);
}
.arm {
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--res-w);
  align-items: center;
  padding: 10px 0;
}
.arm .line {
  margin-left: calc(var(--elbow) - 1px);
}

/* ---------- resolution terminal ---------- */

.res {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  border: 1px solid var(--border-hi);
  border-radius: 999px;
  background: var(--surface);
  padding: 5px var(--s-5) 5px 5px;
  font-size: var(--t-body);
  white-space: nowrap;
  justify-self: start;
}
/* The other branch, present but not this slide's business. */
.res.is-ghost {
  border-style: dashed;
  color: var(--fg-dim);
  padding-left: var(--s-5);
  justify-content: center;
  justify-self: stretch;
}

/* ---------- cache footers ---------- */

/* One band under the branch: A's says the cache survives, B's says the value
   goes into the key. Same box, opposite tone — the cost argument in one glance. */
.foot {
  display: flex;
  align-items: center;
  gap: var(--s-4);
  /* Clears the fork's lower arm, which hangs ~27px below its row. */
  margin-top: var(--s-8);
  border: 1px dashed color-mix(in srgb, var(--tone) 55%, transparent);
  border-radius: var(--r-md);
  padding: var(--s-2) var(--s-4);
  background: var(--surface);
}
.foot.is-ok { --tone: var(--ok); }
.foot.is-tax { --tone: var(--tax); }
.foot-label {
  flex-shrink: 0;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--tone);
}
.foot-body {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  gap: var(--s-2);
  white-space: nowrap;
  color: var(--fg-muted);
  font-size: var(--t-h3);
}
.foot-line {
  flex: 0 0 56px;
  margin: 0 var(--s-3);
  border-top-color: var(--tone);
}
.foot-line::after {
  border-left-color: var(--tone);
}
.foot-body code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
}

/* ---------- photo frame ---------- */

/* Same trunk, tighter: five gates and a fork in 424px. */
.chart.is-photo {
  --gate-w: 320px;
  --res-w: 170px;
  --stub-w: 40px;
  --trunk-x: 160px;
  --pipe-h: 26px;
  --elbow: 10px;
}
.is-photo .gate-in {
  font-size: 18px;
  padding: 3px var(--s-4) 3px var(--s-3);
  gap: var(--s-2);
}
.is-photo .gate-n {
  width: 18px;
  height: 18px;
}
.is-photo .gate-n > span {
  font-size: 10px;
}
.is-photo .res {
  padding: 3px var(--s-4) 3px 3px;
  font-size: var(--t-small);
  gap: var(--s-2);
}
.is-photo .pipe-label,
.is-photo .edge-label {
  font-size: var(--t-mono);
}
.is-photo .arm {
  padding: 4px 0;
}
/* A group = one branch: its rungs on the left, its cache cost on a bracket. */
.group {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  column-gap: var(--s-4);
}
.group.is-ok { --tone: var(--ok); }
.group.is-tax { --tone: var(--tax); }
.group-body {
  min-width: 0;
}
.group-tag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--s-1);
  margin-top: var(--pipe-h);
  padding-left: var(--s-3);
  border-left: 2px solid color-mix(in srgb, var(--tone) 70%, transparent);
}
.group.is-tax .group-tag {
  /* The fork's lower arm hangs under the last row. */
  margin-bottom: -20px;
}
.group-name {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
  color: var(--tone);
}
.group-cost {
  font-size: var(--t-mono);
  color: var(--fg-muted);
}
.group-cost code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
</style>
