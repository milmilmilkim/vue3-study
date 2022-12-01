<template>
  <h1>Canvas</h1>
  <hr />
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  console.log(canvas.value);
});
</script>
