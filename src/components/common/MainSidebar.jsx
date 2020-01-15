import React, { useContext } from "react"
import { Link, useParams, NavLink } from "react-router-dom"
import NavItem from "./NavItem"

function MainSidebar() {
   const urlOrigin = window.location.origin

   return (
      <>
         <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link className="brand-link" to="/admin">
               <img
                  src={`${urlOrigin}/dist/img/AdminLTELogo.png`}
                  alt="AdminLTE Logo"
                  className="brand-image img-circle elevation-3"
                  style={{ opacity: 0.8 }}
               />
               <span className="brand-text font-weight-light">AVENIDA</span>
            </Link>

            <div className="sidebar">
               <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                  <div className="image">
                     <img
                        src={`${urlOrigin}/dist/img/user2-160x160.jpg`}
                        className="img-circle elevation-2"
                        alt="User Image"
                     />
                  </div>
                  <div className="info">
                     <a href="#" className="d-block">
                        Avenida Admin
                     </a>
                  </div>
               </div>

               <nav className="mt-2">
                  <ul
                     className="nav nav-pills nav-sidebar flex-column"
                     data-widget="treeview"
                     role="menu"
                     data-accordion="false"
                  >
                     <NavItem path="/admin" icon="th" title="Dashboard" exact />
                     {/* <NavItem
                path="/admin/manage-users"
                icon="users"
                title="Manage user"
              /> */}
                     <NavItem path="/admin/map" icon="map" title="Map" />
                  </ul>
               </nav>
            </div>
         </aside>
      </>
   )
}

export default MainSidebar
