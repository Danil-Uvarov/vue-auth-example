import axios, { AxiosRequestHeaders } from 'axios'
import router from '@/router/router'
import { RouteNames } from '@/models/RouteNames'
import { useAuthStore } from '@/stores/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// интерцептор срабатывает перед тем, как запрос улетит на бэк

service.interceptors.request.use((config) => {
  const token = useAuthStore().accessToken

  // если токен у нас есть, то подставляем в заголовки
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders
  }
  // оправляем запрос на бек
  return config
})

// интерцептор срабатывает сразу когда получен ответ с бека

service.interceptors.response.use(
  // ответ бека поросто возвращаем
  (Response) => {
    return Response
  },
  // для каждого ответа с бека проверяем код ответа. Если 401 ошибка значит токен протух или отсутствует - перекидываем на логин
  async (error) => {
    if (error.response.status === 401) {
      await router.push({ name: RouteNames.Login })
    }
    return Promise.reject(error)
  }
)
export default service
