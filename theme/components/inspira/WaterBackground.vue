<script lang="ts" setup>
// OGL full-screen shader, scaffolding ported from inspira-ui LiquidBackground
import type { OGLRenderingContext } from 'ogl'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { onMounted, onUnmounted, ref } from 'vue'

const ctnDom = ref<HTMLDivElement | null>(null)

let animateId: number
let renderer: Renderer
let gl: OGLRenderingContext
let mesh: Mesh
let observer: ResizeObserver

const vert = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`

// Tileable water caustics (after Dave Hoskins / joltz0r), tinted for the dark theme
const frag = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uResolution;
  varying vec2 vUv;
  #define TAU 6.28318530718
  void main() {
    vec2 uv = vUv * vec2(uResolution.z, 1.0) * 0.9;
    float time = uTime * 0.35 + 23.0;
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    float inten = 0.005;
    for (int n = 0; n < 5; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= 5.0;
    c = 1.17 - pow(c, 1.4);
    float caustic = pow(abs(c), 8.0);
    vec3 deep = vec3(0.01, 0.05, 0.11);
    vec3 shallow = vec3(0.02, 0.24, 0.38);
    vec3 col = mix(deep, shallow, smoothstep(0.0, 1.0, vUv.y));
    col += vec3(0.55, 0.85, 1.0) * caustic * mix(0.45, 0.9, vUv.y);
    gl_FragColor = vec4(col, 1.0);
  }
`

function resize() {
  if (!ctnDom.value)
    return
  renderer.setSize(ctnDom.value.offsetWidth, ctnDom.value.offsetHeight)
  mesh.program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]
}

function update(t: number) {
  animateId = requestAnimationFrame(update)
  mesh.program.uniforms.uTime.value = t * 0.001
  renderer.render({ scene: mesh })
}

onMounted(() => {
  if (!ctnDom.value)
    return
  renderer = new Renderer()
  gl = renderer.gl
  const program = new Program(gl, {
    vertex: vert,
    fragment: frag,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [1, 1, 1] },
    },
  })
  mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
  ctnDom.value.appendChild(gl.canvas)
  // slide box is scaled by Slidev, so watch the container rather than the window
  observer = new ResizeObserver(resize)
  observer.observe(ctnDom.value)
  resize()
  animateId = requestAnimationFrame(update)
})

onUnmounted(() => {
  cancelAnimationFrame(animateId)
  observer?.disconnect()
  gl?.canvas.remove()
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
})
</script>

<template>
  <div ref="ctnDom" class="water-bg" />
</template>

<style scoped>
.water-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.water-bg :deep(canvas) {
  display: block;
}
</style>
