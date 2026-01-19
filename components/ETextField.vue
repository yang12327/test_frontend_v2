<template>
  <div class="textbox">
    <label :for="id">{{ label }}</label>
    <input :id="id" v-model="value" v-bind="attrs" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), { value: '' })
const emit = defineEmits<{
  'update:value': [value: string]
}>()
const attrs = useAttrs()

// 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
const uniqueId = useId()
const id = computed(() => props.id || uniqueId)

// 雙向綁定 value
const value = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
})
</script>

<style scoped lang="scss">
.textbox {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: transparent;
    color: white;
    font-size: 1.25rem;
    line-height: 1.5;
  }
}
</style>
