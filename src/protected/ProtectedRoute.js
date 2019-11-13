import React from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { ChartContextProvider } from "../context/ChartContext"

function ProtectedRoute({ components: Components, ...res }) {
  // window.localStorage.clear()
  let token = window.localStorage.getItem("TOKEN")
  return (
    <ChartContextProvider>
      <Route
        {...res}
        render={props =>
          token ? (
            Components.map((Component, index) => (
              <Component key={index} {...props} />
            ))
          ) : (
            <Redirect
              to={{ pathname: "/admin/login", state: { from: props.location } }}
            />
          )
        }
      />
    </ChartContextProvider>
  )
}

export default ProtectedRoute
