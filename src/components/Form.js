import { useState } from "react"
import MapMain from "./MapMain"

export default function Form() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(null)
  const [users, setUsers] = useState([])

  const handleLogin = (event) => {
    event.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRole(data.role)
        if (data.role === "Admin") {
          fetchUsers()
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const fetchUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {role === "Admin" && (
        <>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </>
      )}
      {role === "Viewer" && <MapMain />}
    </>
  )
}
