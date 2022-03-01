import { client } from './client'

const clientId = process.env.REACT_APP_API_CLIENT_ID
const clientSecret = process.env.REACT_APP_API_CLIENT_SECRET

const setClientTokens = ({ accessToken, refreshToken }) => {
  client.setAccessToken(accessToken)
  client.setRefreshToken(refreshToken)
}

async function refresh(refreshToken) {
  const { data } = await client.post(
    '/v1/oauth/token',
    {
      clientId,
      clientSecret,
      grantType: 'refresh_token',
      refreshToken,
    },
    {
      skipAuthRefresh: true,
    },
  )
  setClientTokens(data)

  return data
}

async function token(request) {
  const body = {
    ...request,
    clientId,
    clientSecret,
    grantType: 'password',
  }
  const { data } = await client.post('/v1/oauth/token', body)
  setClientTokens(data)

  return data
}

export const oauth = {
  refresh,
  token,
}
