import { computed } from "vue"
import { useStore } from "vuex"

export function useConfig() {
  const $store = useStore()

  let config = computed(() => $store.getters.getConfig).value

  return config
}