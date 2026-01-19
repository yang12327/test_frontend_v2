import { defineStore } from 'pinia'
import type { MainGetUserInfoResp } from '@/api'

export const useUserStore = defineStore('user', () => {
  const data = ref<MainGetUserInfoResp[]>([])

  const refresh = async () => {
    const userApi = useApi()
    const { data: result } = await userApi.getUserInfo()
    if (result.data) data.value = result.data

    return result
  }

  return { data, refresh }
})
