import React, { useState, createContext } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextPrivider = ({ children }) => {
  let [token, setToken] = useState("")

  const Authorize = async (username, password, cb) => {
    let resp = await axios.post("/api/post/login", {
      username,
      password
    })

    let { verified, message, token } = resp.data
    if (verified) {
      window.localStorage.setItem("TOKEN", token)
      setToken(resp.data)
      return [true, message]
    } else {
      return [false, message]
    }
  }

  const logout = () => {}

  return (
    <AuthContext.Provider value={{ Authorize, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
