<template>
  <button class="e-btn" :class="[`e-btn-${props.color}`, `e-btn-${props.size}`]">
    <template v-if="props.text">{{ props.text }}</template>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' | 'white' // 預設為 success
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  size: 'md',
})
</script>

<style scoped lang="scss">
.e-btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition:
    opacity 0.15s,
    border-color 0.15s;

  &-sm {
    padding: 0.5rem 0.5rem;
  }

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  // success 綠
  &-success {
    background-color: #0d861c;
    color: white;
  }

  // error 紅
  &-error {
    background-color: #b21c1b;
    color: white;
  }

  // warn 黃
  &-warn {
    background-color: #fcc135;
  }

  // white 白
  &-white {
    background-color: #ffffff;
  }
}
</style>
