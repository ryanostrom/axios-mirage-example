import axios from 'axios'
import axiosRefresh from 'axios-auth-refresh'
import axiosRetry, { exponentialDelay } from 'axios-retry'
import { axiosAuth } from './auth'
import { axiosError } from './errors'

export class Client {
  constructor() {
    this.client = axios.create()
    axiosAuth(this.client, this.getAccessToken)
    axiosRefresh(this.client, this.refreshToken, { skipWhileRefreshing: false })
    axiosRetry(this.client, { retries: 4, retryDelay: exponentialDelay })
    axiosError(this.client)

    this.get = this.client.get
    this.delete = this.client.delete
    this.head = this.client.head
    this.options = this.client.options
    this.post = this.client.post
    this.put = this.client.put
    this.patch = this.client.patch

    this.configure()
  }

  configure() {
    const accessToken = window.sessionStorage.getItem('access-token')
    if (accessToken) {
      this.setAccessToken(accessToken)
    }

    const refreshToken = window.sessionStorage.getItem('refresh-token')
    if (refreshToken) {
      this.setRefreshToken(refreshToken)
    }
  }

  getAccessToken = () => {
    return this.accessToken
  }

  getRefreshToken = () => {
    return this.token
  }

  setDefaultHeader = (header, value, type = 'common') => {
    this.client.defaults.headers[type][header] = value
  }

  setAccessToken = (token) => {
    this.accessToken = token
    window.sessionStorage.setItem('access-token', token)
  }

  setRefreshToken = (token) => {
    this.token = token
    window.sessionStorage.setItem('refresh-token', token)
  }

  setRefreshHandler = (handler) => {
    this.refreshHandler = handler
  }

  refreshToken = (error) => {
    if (
      error &&
      (error?.response?.data?.code !== 'InvalidCredentials' ||
        !error?.response?.data?.message?.includes?.('Expired'))
    ) {
      return Promise.reject(error)
    }

    return this.refreshHandler?.(this.getRefreshToken()) || Promise.reject(error)
  }
}

export const client = new Client()
export { ApiError, ApiErrorType } from './errors'
