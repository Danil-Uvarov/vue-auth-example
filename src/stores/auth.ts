import { defineStore } from 'pinia'
import { IUser } from '@/models/entities/IUser'
import { getUserMe, login, logout } from '@/api/auth'
import { IRequestLogin } from '@/models/reguest/IRequestLogin'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/cookies'

interface AuthStoreState {
  accessToken: string
  me?: IUser
  permission?: []
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    accessToken: getAccessToken(),
    me: {} as IUser,
  }),
  actions: {
    async login(payload: IRequestLogin) {
      const { data } = await login(payload)
      this.setAccessToken(data.token)
      await this.getUserMe()
    },
    async getUserMe() {
      const { data } = await getUserMe()
      this.me = data.data
    },
    setAccessToken(token: string) {
      this.accessToken = token
      setAccessToken(token)
    },
    resetToken() {
      this.accessToken = ''
      this.me = undefined
      removeAccessToken()
    },
    async logout() {
      await logout()
      this.resetToken()
    },
  },
})
