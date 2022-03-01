import React, { useState } from 'react'
import { API, client } from '../api'

const login = async ({ username, password }, authenticate) => {
  await API.oauth.token({ username, password })
  authenticate()
}

const Unauthenticated = ({ authenticate }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => login({ username, password }, authenticate)

  return (
    <>
      <h1>Unauthenticated</h1>
      <h3>Login</h3>
      <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder={'Username'} />
      <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder={'Placeholder'} />
      <button onClick={onLogin}>Login</button>
    </>
  )
}

export default Unauthenticated
