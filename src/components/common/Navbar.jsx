import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { withRouter } from "react-router-dom"

function Navbar({ history }) {
   let { token, setToken } = useContext(AuthContext)

   const handleLogout = e => {
      window.localStorage.removeItem("TOKEN")
      setToken("")
      history.push("/admin/login")
      //  window.location.href = "/login"
   }

   return (
      <>
         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
               <li className="nav-item">
                  <a className="nav-link" data-widget="pushmenu" href="#">
                     <i className="fas fa-bars"></i>
                  </a>
               </li>
            </ul>

            {/* <!-- Right navbar links --> */}
            <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                  <a
                     className="nav-link"
                     data-widget="control-sidebar"
                     data-slide="true"
                     href="#"
                     onClick={e => handleLogout(e)}
                  >
                     Logout
                  </a>
               </li>
            </ul>
         </nav>
      </>
   )
}

export default withRouter(Navbar)
