import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true)
  const [isViewer, setIsViewer] = useState(false)

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, isViewer, setIsViewer }}>
      {children}
    </AuthContext.Provider>
  )
}
