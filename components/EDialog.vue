<template>
  <Teleport to="body">
    <div v-if="modelValue" class="e-dialog-overlay" @click="close()">
      <div class="e-dialog" @click.stop>
        <div class="e-dialog-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="close()">×</button>
        </div>
        <div class="e-dialog-body">
          <slot />
        </div>
        <div class="e-dialog-footer" v-if="$slots.footer">
          <slot name="footer" v-bind="{ close }" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Dialog',
  width: '500px',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: [exitCode: any]
}>()

const close = (exitCode?: any) => {
  emit('update:modelValue', false)
  emit('close', exitCode)
}
</script>

<style scoped lang="scss">
.e-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.e-dialog {
  background-color: #333;
  border-radius: 0.5rem;
  padding: 1.5rem;
  min-width: 300px;
  max-width: 90%;
  width: v-bind('props.width');
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  color: white;
  border: 1px solid #444;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #444;

    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  .close-btn {
    background: none;
    border: none;
    color: #999;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: white;
    }
  }

  &-body {
    padding: 0.5rem 0;
  }

  &-footer {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #444;
  }
}
</style>
