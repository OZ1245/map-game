import { computed } from "vue"
import { useStore } from "vuex"
// import { useSettings } from "./settings"
import { useConfig } from "./config"

export function useMap() {
  const $store = useStore()
  // const $settings = useSettings()
  // console.log('settings:', settings)
  const $config = useConfig()

  const $_map_checkCoords = ([x, y]) => {
    // console.log('--- $_map_checkCoords method ---')
    // console.log('x, y:', x, y)
    return (x !== -1 && y !== -1) && (x !== $config.size.x && y !== $config.size.y)
  }

  // Создание карты
  const createMap = () => {
    // const level = computed(() => $store.getters.getLevel).value
    // $store.dispatch('loadLevel', level)

    // console.log('size:', $config.size) 

    // CSS
    const documentRoot = document.documentElement
    const cssMapCellSize = 50
    documentRoot.style.setProperty(
      "--map-cell-size", `${cssMapCellSize}px`
    )
    documentRoot.style.setProperty(
      '--map-range', $config.size.x
    )
  }

  // Получение карты
  const getMap = () => computed(() => $store.getters.getMap).value

  /**
   * Возвращает информацию о ландшафте и обектах на ячейке карты
   * @param {Array} coords Координаты
   * 
   * @returns {Object} Структуированная информация 
   */
  const getCellInfo = ([x, y]) => {
    const map = getMap()

    return map[x][y] 
  }

  /**
   * Получить информацию о ландшафте и объектах вокруг игрока
   * @param {Array} coords Координаты игрока 
   * @returns {Array} Структуированная информация
   */
  const getCellInfoAround = ([x, y]) => {
    const map = getMap()

    let data = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
    
    /*
    data =
      [0:0][0:1][0:2]
      [1:0] [P] [1:2]
      [2:0][2:1][2:2]
    */
    
    // console.log('x, y:', x, y)
    // console.log('$_map_checkCoords([x-1, y-1]):', $_map_checkCoords([x - 1, y - 1]))
    // console.log('$_map_checkCoords([x+1, y+1]):', $_map_checkCoords([x + 1, y + 1]))

    data[0][0] = $_map_checkCoords([x - 1, y - 1]) ? map[x - 1][y - 1] : null
    data[0][1] = $_map_checkCoords([x - 1, y]) ? map[x - 1][y] : null
    data[0][2] = $_map_checkCoords([x - 1, y + 1]) ? map[x - 1][y + 1] : null

    data[1][0] = $_map_checkCoords([x, y-1]) ? map[x][y - 1] : null
    // data[1][1] - Player
    data[1][2] = $_map_checkCoords([x, y+1]) ? map[x][y + 1] : null

    data[2][0] = $_map_checkCoords([x+1, y-1]) ? map[x + 1][y - 1] : null
    data[2][1] = $_map_checkCoords([x+1, y]) ? map[x + 1][y] : null
    data[2][2] = $_map_checkCoords([x+1, y+1]) ? map[x + 1][y + 1] : null

    return data
  }

  const startObjectsEvents = (objects) => {
    objects.map((o) => {
      // console.log('o:', o)

      if (o.events) {
        Object.keys(o.events).forEach((eventName) => {
          // console.log('eventName:', eventName)
          // console.log('o.events[eventName]:', o.events[eventName])

          const event = new CustomEvent(eventName, { detail: o.events[eventName].payload })
          dispatchEvent(event)
        })
      }
    })
  }

  return {
    createMap,
    getMap,
    getCellInfo,
    getCellInfoAround,
    startObjectsEvents
  }
}