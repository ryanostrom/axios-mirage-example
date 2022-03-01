import React, { useState } from 'react'
import { API, client } from '../api'

const logout = async (unauthenticate) => {
  await client.setAccessToken('')
  await client.setRefreshToken('')
  unauthenticate()
}

const User = ({ id, firstName, lastName }, key = null) => (
  <div key={key}>
    <div>id: {id}</div>
    <div>firstName: {firstName}</div>
    <div>lastName: {lastName}</div>
    <br/>
  </div>
)

const Authenticated = ({ unauthenticate }) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const onLogout = () => logout(unauthenticate)

  const onList = async () => {
    const response = await API.user.list()
    setUsers(response)
  }

  const onCreate = async () => {
    const response = await API.user.create({ firstName, lastName })
    setUser(response)
  }

  return (
    <>
      <h1>Authenticated</h1>
      <button onClick={onLogout}>Logout</button>
      <h3>GET /user</h3>
      <button onClick={onList}>List User</button>
      {users.map((user, key) => <User {...user} key={key} />)}
      <h3>POST /user</h3>
      <input onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder={'First Name'} />
      <input onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder={'Last Name'} />
      <button onClick={onCreate}>Create User</button>
      {user.id && <User {...user} />}
    </>
  )
}

export default Authenticated
