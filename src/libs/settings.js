import { computed } from "vue"
import { useStore } from "vuex"

export function useSettings() {
  const $store = useStore()

  const settings = computed(() => $store.getters.getSettings).value

  return settings
}