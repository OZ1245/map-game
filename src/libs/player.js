import { computed } from "vue"
import { useStore } from "vuex"
import { useConfig } from "./config"
import { useMap } from "./map"
// import { useSettings } from "./settings"

export function usePlayer() {
  const $store = useStore()
  // const $settings = useSettings()
  const $config = useConfig()
  const $map = useMap()
  const size = $config.size
  const map = computed(() => $map.getMap()).value
  // const map = $map.getMap()

  const initPlayer = () => {
    const [x, y] = $config.playerPosition

    if (x < 0 || y < 0) {
      throw "Позиция игрока не может быть установлена за пределами карты."
    }

    console.log('map:', map)
    if (map.length && map[x][y].objects === 'npc') {
      throw "Позиция игрока не может быть установлена. В данных координатах позиция NPC."
    }

    if (map.length && map[x][y].type === 'let') {
      throw "Позиция игрока не может быть установлена. В данных координатах позиция препятствия."
    }

    $store.dispatch('setPlayer', [x,y])
  }

  const getPlayerPosition = () => {
    return computed(() => $store.getters.getPlayerCurrentPosition).value
  }

  const move = (direction) => {
    // console.log('direction:', direction)
    const [currentX, currentY] = getPlayerPosition()
    let x, y

    if (
      (direction === 'up' && currentX === 0) ||
      (direction === 'left' && currentY === 0) ||
      (direction === 'down' && currentX === size.x - 1) ||
      (direction === 'right' && currentY === size.y - 1)
    ) {
      return
    }

    if (direction === 'up') {
      x = currentX - 1
      y = currentY 
    }

    if (direction === 'left') {
      x = currentX
      y = currentY - 1 
    }

    if (direction === 'down') {
      x = currentX + 1
      y = currentY 
    }

    if (direction === 'right') {
      x = currentX
      y = currentY + 1 
    }

    const cellInfo = $map.getCellInfo([x, y])
    console.log('cellInfo:', cellInfo)
    
    if (cellInfo.type === 'uncrossed' || cellInfo.objects.some(o => !o.crossed)) {
      return
    }

    $store.dispatch('changePlayerPosition', {
      newPosition: [ x, y ],
      oldPosition: [ currentX, currentY ]
    })
  }

  return {
    initPlayer,
    getPlayerPosition,
    move,
  }
}