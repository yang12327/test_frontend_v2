<template>
  <div class="container">
    <!-- UI Components Demo Section -->
    <div class="card mb-5">
      <h2 class="mb-4">UI Components Demo</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
          <label class="text-white w-24">Dialog:</label>
          <EBtn @click="showDialog = true">Open Dialog</EBtn>
        </div>

        <div class="flex gap-4 items-center">
          <label class="text-white w-24">Dropdown:</label>
          <div class="w-64">
            <EDropdown
              v-model="selectedFruit"
              :options="fruitOptions"
              placeholder="Select a fruit"
            />
          </div>
          <span class="text-white ml-2">Selected: {{ selectedFruit }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>{{ $t('action') }}</h2>

      <ETextField v-model:value="form.name" :label="$t('name')" />
      <ETextField v-model:value="form.age" :label="$t('age')" />

      <div class="pt-2 sm:pt-5 flex justify-end gap-x-4">
        <EBtn color="success">{{ $t('edit') }}</EBtn>
        <EBtn color="warn">{{ $t('add') }}</EBtn>
      </div>
    </div>

    <div class="card">
      <table class="text-center w-full" v-if="userStore.data.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('name') }}</th>
            <th>{{ $t('age') }}</th>
            <th>{{ $t('action') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="data in userStore.data" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>
              <div class="flex gap-x-1 justify-center">
                <EBtn color="success" size="sm" class="px-2">{{ $t('edit') }}</EBtn>
                <EBtn color="error" size="sm">{{ $t('delete') }}</EBtn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center py-10">{{ $t('no_data') }}</div>
    </div>

    <EDialog v-model="showDialog" title="Hello Dialog">
      <div class="py-2">
        <p class="mb-4">This is a reusable dialog component.</p>
        <p>
          You selected: <strong>{{ selectedFruit || 'Nothing' }}</strong>
        </p>
      </div>
      <template #footer>
        <EBtn color="warn" size="sm" @click="showDialog = false">Close</EBtn>
        <EBtn size="sm" @click="showDialog = false">Save</EBtn>
      </template>
    </EDialog>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

// 使用useAsyncData避免Client重複請求
await useAsyncData('getUserInfo', async () => await userStore.refresh())

const form = ref({
  name: '',
  age: '',
})

// UI Components Demo State
const showDialog = ref(false)
const selectedFruit = ref('')
const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Mango', value: 'mango' },
]
</script>

<style scoped lang="scss"></style>
