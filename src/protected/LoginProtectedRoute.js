import React, { withRouter } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function LoginProtectedRoute({ component: Component, ...res }) {
  let token = window.localStorage.getItem("TOKEN")
  return (
    <Route
      {...res}
      render={props =>
        token ? (
          <Redirect
            to={{ pathname: "/admin", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default LoginProtectedRoute
