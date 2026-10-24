<script setup lang="ts">
defineProps<{
  name: string
  role?: string
  avatar?: string
  handle?: string
  /** Avatar beside the text instead of above it — used by the quote layout. */
  row?: boolean
}>()
</script>

<template>
  <div class="person-card" :class="{ row }">
    <img v-if="avatar" :src="avatar" :alt="name" class="avatar" />
    <div v-else class="avatar avatar-placeholder">{{ name[0] }}</div>
    <div class="person-info">
      <div class="person-name">{{ name }}</div>
      <div v-if="handle" class="person-handle">{{ handle }}</div>
      <div v-if="role" class="person-role">{{ role }}</div>
    </div>
  </div>
</template>

<style scoped>
.person-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-2);
}
.person-card.row {
  flex-direction: row;
  align-items: center;
  gap: var(--s-4);
}
.person-card.row .avatar {
  width: 56px;
  height: 56px;
}
.person-card.row .avatar-placeholder {
  font-size: 24px;
}
.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-elevated);
  border: 1px solid var(--border);
  flex-shrink: 0;
}
.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent);
  color: var(--accent-on);
  font-weight: 700;
  font-size: 32px;
}
.person-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.person-name {
  font-weight: 600;
  font-size: var(--t-body);
  color: var(--fg);
  line-height: 1.2;
}
.person-handle {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--t-small);
  color: var(--fg-dim);
  line-height: 1.2;
}
.person-role {
  color: var(--accent);
  font-size: var(--t-small);
  margin-top: 4px;
  line-height: 1.2;
}
</style>
