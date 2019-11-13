import React from "react"
import { NavLink } from "react-router-dom"

function NavItem({ title, path, exact, icon }) {
  return (
    <li className="nav-item">
      <NavLink
        to={path}
        exact
        className="nav-link"
        activeClassName="nav-link active"
      >
        <i className={`nav-icon fas fa-${icon}`}></i>
        <p>{title}</p>
      </NavLink>
    </li>
  )
}

export default NavItem
