<template>
  <div class="e-dropdown" ref="dropdownRef">
    <slot v-if="$slots.default" v-bind="{ isOpen, toggle, value: displayValue }" />
    <div v-else class="e-dropdown-trigger" @click="toggle" :class="{ 'is-open': isOpen }">
      <span>{{ displayValue }}</span>
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </div>
    <div v-show="isOpen" class="e-dropdown-menu">
      <div v-if="options.length === 0" class="e-dropdown-item no-data">
        {{ $t('no_data') }}
      </div>
      <div
        v-else
        v-for="item in options"
        :key="item.value"
        class="e-dropdown-item"
        :class="{ active: item.value === modelValue }"
        @click="select(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options?: Option[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: 'Please Select',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const displayValue = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const closeOnClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<style scoped lang="scss">
.e-dropdown {
  position: relative;
  display: inline-block;
  font-size: 1rem;
}

.e-dropdown-trigger {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;

  &:hover,
  &.is-open {
    border-color: #fff;
  }

  .arrow {
    font-size: 0.8rem;
    transition: transform 0.2s;
    &.open {
      transform: rotate(180deg);
    }
  }
}

.e-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 0.5rem;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  min-width: 5rem;
}

.e-dropdown-item {
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: #444;
  }

  &.active {
    background-color: #0d861c; // match success color
  }

  &.no-data {
    color: #999;
    cursor: default;
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
