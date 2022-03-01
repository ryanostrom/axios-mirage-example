export function axiosAuth(client, accessToken) {
  return client.interceptors.request.use((request) => {
    if (!request.url?.includes('/oauth') && !!accessToken()) {
      request.headers.Authorization = `Bearer ${accessToken()}`
    }

    return request
  })
}
