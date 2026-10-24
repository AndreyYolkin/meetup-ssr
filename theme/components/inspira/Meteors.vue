<script lang="ts" setup>
defineProps({
  count: {
    type: Number,
    default: 20,
  },
})

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
</script>

<template>
  <span
    v-for="i in count"
    :key="`meteor-${i}`"
    :style="{
      top: '0',
      left: `${Math.floor(rand(-400, 400))}px`,
      animationDelay: `${rand(0.2, 0.8).toFixed(2)}s`,
      animationDuration: `${Math.floor(rand(4, 10))}s`,
    }"
    class="meteor"
  />
</template>

<style scoped>
.meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 9999px;
  background-color: rgba(148, 163, 184, 0.8);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
  transform: rotate(45deg);
  animation-name: meteor;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  width: 60px;
  height: 1px;
  transform: translateY(-50%);
  background: linear-gradient(to right, rgba(120, 126, 255, 0.7), transparent);
}

@keyframes meteor {
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(215deg) translateX(-500px);
    opacity: 0;
  }
}
</style>
