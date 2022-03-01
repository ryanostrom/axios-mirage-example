import { createServer, Response } from "miragejs"

let id = 3
const accessToken = '1234567890'
const refreshToken = '0987654321'
const Authorization = `Bearer ${accessToken}`

const username = 'test'
const password = 'test'

const validCredentials = (data) => data.username == username && data.password == password

const validToken = (data) => data.requestHeaders.Authorization == Authorization

const mockUsers = [
  { id: 1, firstName: 'Bob', lastName: 'Bollacks' },
  { id: 2, firstName: 'Sally', lastName: 'Sue' },
  { id: 3, firstName: 'Tim', lastName: 'Trucker' },
]

const decode = ({ requestBody }) => JSON.parse(requestBody)

export default () => {
  createServer({
    routes() {
      this.post("/v1/oauth/token", (schema, data) => {
        return validCredentials(decode(data)) ?
          new Response(200, {}, { accessToken, refreshToken }) :
          new Response(401, {}, { error: 'Invalid Credentials' })
      })

      this.get("/v1/user", (schema, data) => {
        return validToken(data) ?
          new Response(200, {}, mockUsers) :
          new Response(401, {}, { error: 'Invalid Token' })
      })

      this.post("/v1/user", (schema, data) => {
        const { firstName, lastName } = decode(data)
        return validToken(data) ?
          new Response(200, {}, { id: id++, firstName, lastName }) :
          new Response(401, {}, { error: 'Invalid Token' })
      })
    },
  })
}
