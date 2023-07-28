import Cookies from 'js-cookie'

export const cookieKeyAccessToken = 'access_token'

export const getAccessToken = () => Cookies.get(cookieKeyAccessToken) || ''
export const setAccessToken = (token: string) =>
  Cookies.set(cookieKeyAccessToken, token)
export const removeAccessToken = () => Cookies.remove(cookieKeyAccessToken)
