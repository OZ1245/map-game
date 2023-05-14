<template>
  <div class="bubble">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.bubble {
  position: absolute;
  top: calc(-100% - 4px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  padding: 4px 6px;

  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;

  font-size: 16px;
  line-height: 17px;
  white-space: nowrap;
}
</style>