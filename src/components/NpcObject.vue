<template>
  <div class="npc">
    <span class="npc__object"></span>

    <BubbleDialog v-if="bubbleText">
      {{ bubbleText }}
    </BubbleDialog>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useNpc } from '@/libs/npc';

import BubbleDialog from '@/components/BubbleDialog.vue'

const $npc = useNpc()

let bubbleText = computed(() => {
  // console.log('$npc.bubbleText:', $npc.bubbleText)
  return $npc.bubbleText.value
})

const props = defineProps({
  enemy: {
    type: Boolean,
    required: false,
    default: false
  }
})

console.log('props:', props)

addEventListener('onBubble', (e) => $npc.onBubble(e))
</script>

<style lang="scss" scoped>
.npc {
  position: relative;
}

.npc__object {
  display: block;
  width: 30px;
  height: 30px;

  background-color: yellow;
  border-radius: 50%;
}
</style>