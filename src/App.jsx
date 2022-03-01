import React, { useState } from 'react'
import { client } from './api'
import { Authenticated, Unauthenticated } from './components'

const isAuthenticated = () => {
  const accessToken = client.getAccessToken()
  return accessToken && accessToken != ''
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated())

  return (
    <>
      {authenticated ?
        <Authenticated unauthenticate={() => setAuthenticated(false)} /> :
        <Unauthenticated authenticate={() => setAuthenticated(true)} />
      }
    </>
  )
}

export default App
