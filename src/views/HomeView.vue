<template>
  <div class="home-view">
    <button @click="onStart()">Start</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const $router = useRouter();

const onStart = () => {
  $router.push({
    name: 'Game'
  })
}
</script>
