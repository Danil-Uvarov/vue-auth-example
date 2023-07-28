import { AxiosPromise } from 'axios'
import { ApiPaths } from '@/models/ApiPath'
import { IResponse } from '@/models/responses/IResponse'
import { IUser } from '@/models/entities/IUser'
import request from '@/utils/request'
import { IRequestLogin } from '@/models/reguest/IRequestLogin'
import { IResponseLogin } from '@/models/responses/IResponseLogin'

export const login = (payload: IRequestLogin): AxiosPromise<IResponseLogin> =>
  request.post(`${ApiPaths.BaseApi}/login`, payload)

export const getUserMe = (): AxiosPromise<IResponse<IUser>> =>
  request.get(`/user`)

export const logout = () => request.get(`/logout`)
