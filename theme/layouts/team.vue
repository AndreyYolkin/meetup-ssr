<script setup lang="ts">
interface TeamMember {
  name: string
  role?: string
  avatar?: string
  handle?: string
}
defineProps<{
  team: TeamMember[]
  columns?: number
  mark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout team flex flex-col h-full">
    <Mark v-if="mark !== false" />
    <header v-if="$slots.title" class="mb-[var(--s-6)]">
      <h1 class="team-title">
        <slot name="title" />
      </h1>
    </header>
    <div
      class="team-grid"
      :style="{ gridTemplateColumns: `repeat(${columns ?? 3}, minmax(0, 1fr))` }"
    >
      <PersonCard
        v-for="m in team"
        :key="m.name"
        :name="m.name"
        :role="m.role"
        :avatar="m.avatar"
        :handle="m.handle"
      />
    </div>
  </div>
</template>

<style scoped>
.team-title {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0;
}
.team-grid {
  display: grid;
  gap: var(--s-5) var(--s-6);
}
</style>
