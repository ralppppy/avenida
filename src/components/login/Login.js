import React, { useReducer, useState, useContext } from "react"
import axios from "axios"
import LoginReducer from "./LoginReducer"
import { AuthContext } from "../../context/AuthContext"
import { withRouter } from "react-router-dom"
import "./style.css"
import { useSpring, animated } from "react-spring"
import brand from "../../brand/avenida.png"

function Login({ history }) {
   document.title = "Login"

   const initialState = {
      username: "",
      password: ""
   }
   const animatedProps = useSpring({
      to: {
         opacity: 1
         // marginLeft: 0
      },

      from: {
         opacity: 0
         // marginLeft: -500
      },
      delay: 300
   })

   let [state, dispatch] = useReducer(LoginReducer, initialState)

   let { Authorize } = useContext(AuthContext)
   let [error, setError] = useState("")

   const handleSubmit = async e => {
      e.preventDefault()
      let { username, password } = state

      let data = await Authorize(username, password)
      let [isAuthorize, message] = data
      if (isAuthorize) {
         history.push("/admin")
      } else {
         setError(message)
      }
   }

   return (
      <animated.div style={animatedProps}>
         <div className="container ">
            <div className="row">
               <div className="login-card col-md-6 offset-3 mt-5">
                  <div className="card">
                     {/* <div className="login-logo"> */}
                     {/* <a href="../../index2.html">
                  <b>AVENIDA</b>
                </a> */}
                     <div className="text-center">
                        <img src={brand} alt width={150} className="mt-5" />
                     </div>
                     {/* </div> */}
                     <div className="card-body login-card-body">
                        {/* <p className="login-box-msg">
                           Sign in to start monitoring water level
                        </p> */}
                        <p className="text-danger">{error}</p>
                        <form action="../../index3.html" method="post">
                           <label htmlFor="username">Username</label>
                           <div className="input-group mb-3">
                              <input
                                 type="username"
                                 name="username"
                                 className="form-control"
                                 onChange={e =>
                                    dispatch({
                                       type: "INPUT",
                                       field: "username",
                                       value: e.target.value
                                    })
                                 }
                              />
                              <div className="input-group-append">
                                 <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                 </div>
                              </div>
                           </div>
                           <label htmlFor="password">Password</label>
                           <div className="input-group mb-3">
                              <input
                                 type="password"
                                 className="form-control"
                                 name="password"
                                 onChange={e =>
                                    dispatch({
                                       type: "INPUT",
                                       field: "password",
                                       value: e.target.value
                                    })
                                 }
                              />
                              <div className="input-group-append">
                                 <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="col">
                                 <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={e => handleSubmit(e)}
                                 >
                                    Sign In
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </animated.div>
   )
}

export default withRouter(Login)
