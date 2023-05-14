import { ref } from "vue"

// import { useGameplay } from "./gameplay"

export function useNpc() {
  // const $gameplay = useGameplay()

  let bubbleText = ref()

  const onBubble = (event) => {
    // console.log('--- onBubble event handler ---')
    // console.log('event.detail:', event.detail.text)
    bubbleText.value = event.detail.text
  }

  return {
    onBubble,
    bubbleText
  }
}