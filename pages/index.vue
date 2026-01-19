<template>
  <div class="container">
    <div class="card">
      <div>
        <EDropdown
          class="float-right w-32"
          :options="languageOptions"
          :model-value="locale"
          @update:model-value="(v: any) => setLocale(v)"
        />
        <h2>{{ $t('action') }}</h2>
      </div>

      <form
        ref="formRef"
        @submit.prevent="action(form.id === 0 ? ActionType.add : ActionType.edit)"
      >
        <ETextField v-model:value="form.name" :label="$t('name')" required />
        <ETextField v-model:value="form.age" :label="$t('age')" required type="number" />

        <div class="pt-2 sm:pt-5 flex justify-end gap-x-4">
          <EBtn
            v-if="form.id !== 0"
            color="success"
            @click="action(ActionType.edit)"
            type="submit"
            >{{ $t('edit') }}</EBtn
          >
          <EBtn color="warn" @click="action(ActionType.add)" type="submit">{{ $t('add') }}</EBtn>
        </div>
      </form>
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
            <td class="table-action">
              <div class="sm:flex gap-x-1 justify-center hidden">
                <EBtn color="success" size="sm" @click="edit(data)">
                  {{ $t('edit') }}
                </EBtn>
                <EBtn color="error" size="sm" @click="edit(data, ActionType.delete)">
                  {{ $t('delete') }}
                </EBtn>
              </div>
              <div class="sm:hidden">
                <EDropdown
                  placeholder=""
                  :options="[
                    { label: $t('edit'), value: ActionType.edit },
                    { label: $t('delete'), value: ActionType.delete },
                  ]"
                  @update:model-value="(v: any) => edit(data, v)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center py-10">{{ $t('no_data') }}</div>
    </div>

    <EDialog
      v-model="showDialog"
      :title="$t('confirm_msg', { type: $t(ActionType[actionType]) })"
      @close="actionResolve && actionResolve($event)"
    >
      <div class="py-2">
        <table class="text-center w-full">
          <tbody>
            <tr v-if="form.id !== 0 && actionType !== ActionType.add">
              <th>ID</th>
              <td class="font-bold"># {{ form.id }}</td>
            </tr>
            <tr>
              <th>{{ $t('name') }}</th>
              <td>{{ form.name }}</td>
            </tr>
            <tr>
              <th>{{ $t('age') }}</th>
              <td>{{ form.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #footer="{ close }">
        <EBtn color="white" @click="close(false)">{{ $t('cancel') }}</EBtn>
        <EBtn @click="close(true)">{{ $t('confirm') }}</EBtn>
      </template>
    </EDialog>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const userApi = useApi()

// 使用useAsyncData避免Client重複請求
await useAsyncData('getUserInfo', async () => await userStore.refresh())

const form = ref({
  id: 0,
  name: '',
  age: '',
})
const showDialog = ref(false)

enum ActionType {
  none = 0,
  add = 1,
  edit = 2,
  delete = 3,
}

const actionType = ref(ActionType.none) // 目前操作模式
const actionResolve = ref()
const formRef = ref<HTMLFormElement>()
const action = async (type: ActionType) => {
  // 驗證欄位
  if (!formRef.value?.reportValidity()) return

  // 開啟dialog
  actionType.value = type
  showDialog.value = true

  // 等待回覆
  const result = await new Promise((resolve) => (actionResolve.value = resolve))
  if (!result) return

  // 執行API
  switch (type) {
    case ActionType.add:
      await userApi.createUserInfo({ name: form.value.name, age: +form.value.age })
      break
    case ActionType.edit:
      await userApi.updateUserInfo({
        id: form.value.id,
        name: form.value.name,
        age: +form.value.age,
      })
      break
    case ActionType.delete:
      await userApi.deleteUserInfo({ id: form.value.id })
      break
  }

  // 重置表單與刷新列表
  form.value = { id: 0, name: '', age: '' }
  userStore.refresh()
}
const edit = (
  item: {
    age?: number | undefined
    id?: number | undefined
    name?: string | undefined
  },
  type: ActionType = ActionType.none
) => {
  form.value.id = item.id ?? 0
  form.value.name = item.name ?? ''
  form.value.age = String(item.age ?? '')
  nextTick().then(() => {
    if (type === ActionType.delete) action(type)
    else formRef.value?.querySelector('input')?.focus()
  })
}

// 多語言設置
const { locale, locales, setLocale } = useI18n()
const languageOptions = computed(() =>
  locales.value.map((x: any) => ({ label: x.name, value: x.code }))
)
</script>

<style scoped lang="scss">
.table-action {
  width: 3rem;
}

@media (min-width: 640px) {
  .table-action {
    width: 7rem;
  }
}
</style>
