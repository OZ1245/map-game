<template>
  <div class="game-view">
    <GameArea class="game-view__game-area"/>

    <!-- <GameInterface class="game-view__interface"/> -->
  </div>
</template>

<script setup>
import GameArea from '@/components/GameArea'
// import GameInterface from '@/components/GameInterface'
</script>

<style lang="scss">
.game-view {
  width: 100%;
  height: 100%;

  position: relative;
}

.game-view__game-area {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
}

// .game-view__interface {
//   width: 100%;
//   height: 100%;

//   position: absolute;
//   top: 0;
//   left: 0;
// }
</style>