<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref, watchEffect } from 'vue'

interface SphereIcon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface Props {
  images: string[]
  size?: number
  iconSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 420,
  iconSize: 64,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const animationFrameRef = ref<number>(0)

interface LoadedImage {
  element: HTMLImageElement
  aspectRatio: number
}

const loadedImagesRef = ref<(LoadedImage | null)[]>([])
const imagesLoadedRef = ref<boolean[]>([])

const imagePositions = ref<SphereIcon[]>([])

const rotation = reactive({ x: 0, y: 0 })

watchEffect(() => {
  const images = props.images
  if (!images) return
  loadedImagesRef.value = new Array(images.length).fill(null)
  imagesLoadedRef.value = new Array(images.length).fill(false)

  images.forEach((url, idx) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () => {
      loadedImagesRef.value[idx] = {
        element: img,
        aspectRatio: img.naturalWidth > 0 && img.naturalHeight > 0
          ? img.naturalWidth / img.naturalHeight
          : 1,
      }
      imagesLoadedRef.value[idx] = true
    }
  })

  loadedImagesRef.value = loadedImagesRef.value.slice()
})

watchEffect(() => {
  const count = props.images?.length || 0
  if (count === 0) {
    imagePositions.value = []
    return
  }

  const newPositions: SphereIcon[] = []
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * increment
    const x = Math.cos(phi) * r
    const z = Math.sin(phi) * r

    newPositions.push({
      x: x * (props.size / 3),
      y: y * (props.size / 3),
      z: z * (props.size / 3),
      scale: 1,
      opacity: 1,
      id: i,
    })
  }
  imagePositions.value = newPositions
})

onMounted(() => {
  const canvasEl = canvasRef.value
  const ctx = canvasEl?.getContext('2d')
  if (!canvasEl || !ctx) return
  const canvas = canvasEl
  const context = ctx
  const devicePixelRatio = window.devicePixelRatio || 1

  function syncCanvasResolution() {
    // Render in physical pixels for crisp logos on hiDPI displays.
    canvas.width = Math.round(props.size * devicePixelRatio)
    canvas.height = Math.round(props.size * devicePixelRatio)
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
  }

  syncCanvasResolution()
  const startedAt = performance.now()

  function animate() {
    const elapsed = (performance.now() - startedAt) / 1000
    context.clearRect(0, 0, props.size, props.size)

    const centerX = props.size / 2
    const centerY = props.size / 2

    // Autonomous movement: steady orbit + subtle vertical sway.
    const targetTiltX = Math.sin(elapsed * 0.55) * 0.22
    rotation.x += (targetTiltX - rotation.x) * 0.05
    rotation.y += 0.0034

    imagePositions.value.forEach((icon, index) => {
      const cosX = Math.cos(rotation.x)
      const sinX = Math.sin(rotation.x)
      const cosY = Math.cos(rotation.y)
      const sinY = Math.sin(rotation.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const scale = (rotatedZ + (props.size / 2)) / (props.size * 0.75)
      const opacity = Math.max(0.2, Math.min(1, (rotatedZ + (props.size / 2.5)) / (props.size / 1.5)))

      context.save()
      context.translate(centerX + rotatedX, centerY + rotatedY)
      context.scale(scale, scale)
      context.globalAlpha = opacity

      const image = loadedImagesRef.value[index]
      if (image && imagesLoadedRef.value[index]) {
        const targetHeight = props.iconSize * 0.9
        let drawWidth = targetHeight * image.aspectRatio
        let drawHeight = targetHeight

        const maxWidth = props.iconSize * 1.8
        if (drawWidth > maxWidth) {
          const shrink = maxWidth / drawWidth
          drawWidth = maxWidth
          drawHeight *= shrink
        }

        const minWidth = props.iconSize * 0.65
        if (drawWidth < minWidth) {
          const grow = minWidth / drawWidth
          drawWidth = minWidth
          drawHeight *= grow
        }

        context.drawImage(image.element, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
      }
      context.restore()
    })

    animationFrameRef.value = requestAnimationFrame(animate)
  }

  animationFrameRef.value = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationFrameRef.value) cancelAnimationFrame(animationFrameRef.value)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :style="{ width: `${size}px`, height: `${size}px` }"
    role="img"
    aria-label="Ecosystem logos cloud"
  />
</template>
