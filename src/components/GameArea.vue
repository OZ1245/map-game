<template>
  <div class="game-area">
    <div class="map">
      <template
        v-for="(row, x) in map"
        :key="`row-${x}`" 
      >
        <div 
          v-for="(cell, y) in row"
          :key="`cell-${y}`"
          class="map__cell"
          :class="[
            { 'map__cell--uncrossed' : cell.type === 'uncrossed' }
          ]"
          :data-coords="`${x} : ${y}`"
        >
          <!-- Debug objects -->
          <!-- <template v-if="isPlayer([x,y])">
            <span class="map__player"></span>
          </template> -->
          <template v-if="cell.objects.length">
            <span 
              class="map__object"
              :class="[
                {'map__object--uncrossed':isUncrossedObject([x,y])},
                {'map__object--npc':isNpc([x,y])},
              ]"
            ></span>

            <NpcObject 
              v-if="isNpc([x,y])"
              v-bind="isNpc([x,y])"
            />
          </template>
          <!-- END Debug objects -->
        </div>
      </template>
    </div>

    <span class="game-area__player"></span>
  </div>
</template>

<script setup>
// import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import { computed, onMounted, onUnmounted } from 'vue';
import { useGameplay } from '@/libs/gameplay';
import { useMap } from '@/libs/map';

import NpcObject from '@/components/NpcObject'

const $gameplay = useGameplay()
const $map = useMap()

// onBeforeMount(() => {
onMounted(() => {
  $gameplay.init()

  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

let map = computed(() => $map.getMap())

// const isPlayer = ([x, y]) => {
//   return !!map.value[x][y].objects.find((o) => o.type === 'player')
// }

const isUncrossedObject = ([x, y]) => {
  return map.value[x][y].objects.some(o => (
    o.type === 'object' && o.crossed !== 'crossed'
  ))
}

const isNpc = ([x, y]) => {
  return map.value[x][y].objects.find(o => (
    o.type === 'npc'
  ))
}

const onKeydown = (event) => {
  $gameplay.bindControl(event)
}
</script>

<style lang="scss" scoped>
.game-area {
  width: 100%;
  height: 100%;

  position: relative;

  overflow: hidden;
}

.game-area__player {
  display: block;
  width: 30px;
  height: 30px;

  background-color: blue;
  border-radius: 50%;

  position: absolute;
  top: 50%;
  left: 50%;
}

.map {
  display: grid;
  grid-template-columns: repeat((var(--map-range), auto));
  // width: var(--map-size);
  width: calc(var(--map-cell-size) * var(--map-range));
  aspect-ratio: 1;

  position: absolute;
  left: var(--map-shift-x);
  top: var(--map-shift-y);
  transform: translate(calc((-50px + 30px) / 2), calc((-50px + 30px) / 2));

  transition: top .6s, left .6s;
}

.map__cell {
  display: flex;
  justify-content: center;
  align-items: center;

  width: var(--map-cell-size);
  height: var(--map-cell-size);
  // aspect-ratio: 1/1;

  outline: 1px dashed gray;

  position: relative;
}

.map__cell--uncrossed {
  background-color: black;
}

.map__cell::before {
  content: attr(data-coords);

  position: absolute;
  z-index: -1;
  pointer-events: none;

  font-size: 120%;
  color: gray;
}

// .map__player {
//   display: block;
//   width: 30px;
//   height: 30px;

//   background-color: blue;
//   border-radius: 50%;
// }

.map__object {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.map__object--uncrossed {
  background-color: gray;
}
.map__object--npc {
  // display: block;
  // width: 30px;
  // height: 30px;

  // background-color: yellow;
  // border-radius: 50%;
  display: none;
}
</style>