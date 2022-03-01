export const ApiErrorType = {
  Client: 'CLIENT',
  Internal: 'INTERNAL',
  Network: 'NETWORK',
  Server: 'SERVER',
}

export class ApiError extends Error {
  constructor() {
    super(`API ERROR`)

    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export function axiosError(client) {
  return client.interceptors.response.use(undefined, (error) => {
    if (error.response) {
      const type = error.response.status >= 500 ? ApiErrorType.Server : ApiErrorType.Client

      return Promise.reject(
        new ApiError(type, error.response.status, error.response.data, error.response.data?.code),
      )
    }

    if (error instanceof ApiError) {
      return Promise.reject(error)
    }

    if (error.request) {
      return Promise.reject(new ApiError(ApiErrorType.Network))
    }

    return Promise.reject(new ApiError(ApiErrorType.Internal))
  })
}
