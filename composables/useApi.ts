import { Configuration, UserApi } from '@/api'

export default () => {
  // 取得evn中的API_BASE_URL
  const basePath = useRuntimeConfig().public.apiBaseUrl as string
  const config = new Configuration({ basePath })

  // 傳回API控制器
  return new UserApi(config)
}
