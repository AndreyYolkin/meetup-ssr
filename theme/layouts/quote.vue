<script setup lang="ts">
defineProps<{
  mark?: boolean
  /* Reviewers asked who each of these people is and why we should care, so the
     author is part of the layout: the quote renders as a chat bubble from them. */
  name?: string
  handle?: string
  role?: string
  avatar?: string
}>()
</script>

<template>
  <div class="slidev-layout quote flex flex-col justify-center items-start h-full">
    <Mark v-if="mark !== false" />
    <div class="quote-message">
      <img v-if="avatar" :src="avatar" :alt="name" class="quote-avatar" />
      <div v-else-if="name" class="quote-avatar quote-avatar-placeholder">{{ name[0] }}</div>
      <div class="quote-bubble">
        <header v-if="name" class="quote-header">
          <div>
            <span class="quote-name">{{ name }}</span>
            <span v-if="handle" class="quote-handle">{{ handle }}</span>
          </div>
          <div v-if="role" class="quote-role">{{ role }}</div>
        </header>
        <blockquote class="quote-body">
          <slot />
        </blockquote>
        <footer v-if="$slots.attribution" class="quote-attribution">
          <slot name="attribution" />
        </footer>
      </div>
    </div>
    <div v-if="$slots.extra" class="quote-extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped>
.quote-message {
  display: flex;
  align-items: flex-end;
  gap: var(--s-4);
}
.quote-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-elevated);
  border: 1px solid var(--border);
  flex-shrink: 0;
}
.quote-avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent);
  color: var(--accent-on);
  font-weight: 700;
  font-size: 32px;
}
/* Small bottom-left corner = the tail pointing at the avatar. */
.quote-bubble {
  /* Opaque: --surface-hi is rgba and lets the dot grid show through. */
  background-color: color-mix(in srgb, var(--fg) 8%, var(--bg));
  border-radius: 24px 24px 24px 6px;
  padding: var(--s-4) var(--s-6);
  max-width: 740px;
}
.quote-header {
  margin-bottom: var(--s-2);
}
.quote-name {
  color: var(--accent-hi);
  font-weight: 600;
  font-size: var(--t-h3);
}
.quote-handle {
  margin-left: var(--s-2);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--fg-dim);
}
.quote-role {
  color: var(--fg-muted);
  font-size: var(--t-small);
  line-height: 1.3;
}
.quote-body {
  font-size: 40px;
  line-height: 1.25;
  font-weight: 500;
  color: var(--fg);
  margin: 0;
}
/* Slidev wraps slot content in a <p>, and base.css sets `.slidev-layout p` to
   --t-body — which beat the blockquote and rendered every quote in the deck at
   20px instead of 48px. */
.quote-body :deep(p) {
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  color: inherit;
  margin: 0;
}
/* Sits where a chat shows the timestamp. */
.quote-attribution {
  margin-top: var(--s-2);
  text-align: right;
  font-size: var(--t-small);
  color: var(--fg-dim);
}
.quote-attribution :deep(p) {
  font-size: inherit;
  color: inherit;
  margin: 0;
}
.quote-extra {
  margin-top: var(--s-5);
}
</style>
