import { useWindowSize } from '@vueuse/core'
import { useMap } from './map'
import { usePlayer } from './player'
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useGameplay() {
  const $store = useStore()
  const $map = useMap()
  const $player = usePlayer()

  const init = () => {
    const level = computed(() => $store.getters.getLevel).value
    $store.dispatch('loadLevel', level)
      .then(() => {
        $map.createMap()
        $player.initPlayer()
        setCenter()
      })
  }

  const bindControl = (event) => {
    // console.log(event)

    if (event.key === 'w' || event.key === 'ArrowUp') {
      $player.move('up')
      setCenter()
    }

    if (event.key === 'a' || event.key === 'ArrowLeft') {
      $player.move('left')
      setCenter()
    }

    if (event.key === 's' || event.key === 'ArrowDown') {
      $player.move('down')
      setCenter()
    }

    if (event.key === 'd' || event.key === 'ArrowRight') {
      $player.move('right')
      setCenter()
    }
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

  return {
    init,
    bindControl,
    setCenter
  }
}