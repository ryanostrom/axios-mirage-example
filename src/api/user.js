import { client } from './client'

async function list() {
  const { data } = await client.get('/v1/user')

  return data
}

async function create(payload) {
  const { data } = await client.post('/v1/user', payload)

  return data
}

export const user = {
  list,
  create,
}
