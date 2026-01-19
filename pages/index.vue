<template>
  <div>
    [{{ userStore.data }}, {{ status }}, {{ error }}]
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

// 使用useAsyncData避免Client重複請求
const { status, error } = await useAsyncData('getUserInfo', async () => await userStore.refresh())
</script>

<style scoped lang="scss"></style>
