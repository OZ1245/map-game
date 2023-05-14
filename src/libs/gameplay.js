import { computed } from 'vue'
import { useStore } from 'vuex'

import { useWindowSize } from '@vueuse/core'
import { useMap } from './map'
import { usePlayer } from './player'
// import { useNpc } from './npc'

export function useGameplay() {
  const $store = useStore()
  const $map = useMap()
  const $player = usePlayer()
  // const $npc = useNpc()

  // const $emit = defineEmits(['onBubble'])

  const init = () => {
    const level = computed(() => $store.getters.getLevel).value
    $store.dispatch('loadLevel', level)
      .then(() => {
        $map.createMap()
        $player.initPlayer()
        setCenter()
      })
    
    // addEventListener('onBubble', (e) => $npc.onBubble(e))
  }

  const bindControl = (event) => {
    // console.log('--- bindControl method ---')
    // console.log('event:', event)

    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
      onMove('up')
    }

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      onMove('left')
    }

    if (event.code === 'KeyS' || event.code === 'ArrowDown') {
      onMove('down')
    }

    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      onMove('right')
    }

    
  }

  const onMove = (direction) => {
    // console.log('onMove:', onMove)
    // console.log('direction:', direction)
    $player.move(direction)
    setCenter()
    startEvents()
  }

  const setCenter = () => {
    const $windowSize = useWindowSize()

    // console.log('$windowSize:', $windowSize.width, $windowSize.height)

    const center = [$windowSize.width.value / 2, $windowSize.height.value / 2]

    // console.log('center:', center);

    const playerPosition = $player.getPlayerPosition()

    // console.log('playerPosition:', playerPosition)

    const shiftX = center[0] - (50 * playerPosition[1])
    const shiftY = center[1] - (50 * playerPosition[0])

    // console.log('shiftX:', shiftX)
    // console.log('shiftY:', shiftY)

    const documentRoot = document.documentElement
    documentRoot.style.setProperty(
      '--map-shift-x', `${shiftX}px`
    )
    documentRoot.style.setProperty(
      '--map-shift-y', `${shiftY}px`
    )
  }

  const startEvents = () => {
    const playerPosition = $player.getPlayerPosition()
    const aroundInfo = $map.getCellInfoAround(playerPosition)
    
    console.log('aroundInfo:', aroundInfo)

    if (aroundInfo[0][1] && aroundInfo[0][1].objects.length) $map.startObjectsEvents(aroundInfo[0][1].objects)
    if (aroundInfo[1][2] && aroundInfo[1][2].objects.length) $map.startObjectsEvents(aroundInfo[1][2].objects)
    if (aroundInfo[2][1] && aroundInfo[2][1].objects.length) $map.startObjectsEvents(aroundInfo[2][1].objects)
    if (aroundInfo[1][0] && aroundInfo[1][0].objects.length) $map.startObjectsEvents(aroundInfo[1][0].objects)
  }

  // Events Handlers
  // onBubble

  return {
    init,
    bindControl,
    setCenter
  }
}