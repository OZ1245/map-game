import { computed } from "vue"
import { useStore } from "vuex"
// import { useSettings } from "./settings"
import { useConfig } from "./config"

export function useMap() {
  const $store = useStore()
  // const $settings = useSettings()
  // console.log('settings:', settings)
  const $config = useConfig()

  // Создание карты
  const createMap = () => {
    // const level = computed(() => $store.getters.getLevel).value
    // $store.dispatch('loadLevel', level)
    console.log('size:', $config.size) 

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

  return {
    createMap,
    getMap
  }
}