import React, { useEffect, useState, useReducer } from "react"
import { animated, useSpring } from "react-spring"
import ContentHeader from "../common/ContentHeader"
import ManageUserReducer from "./ManageUserReducer"
import axios from "axios"
import { Link } from "react-router-dom"

function ManageUser() {
  document.title = "Manage User"
  const initialState = [
    {
      id: "",
      firstname: "",
      lastname: "",
      email: ""
    }
  ]

  let [state, dispatch] = useReducer(ManageUserReducer, initialState)

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

  useEffect(() => {
    axios
      .get("/api/get/users")
      .then(users => {
        dispatch({ type: "GET_USERS", users: users.data })
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <animated.div style={animatedProps}>
      <div className="content-wrapper">
        <ContentHeader title="Manage user" />

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="row">
                    <div className="col-md-3">
                      <Link to="#">
                        <button className="btn btn-primary m-2">
                          Add User
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="card-header">
                    <h3 className="card-title">Under Construction...</h3>

                    <div className="card-tools">
                      <div
                        className="input-group input-group-sm"
                        style={{ width: 150 }}
                      >
                        <input
                          type="text"
                          name="table_search"
                          className="form-control float-right"
                          placeholder="Search"
                        />

                        <div className="input-group-append">
                          <button type="submit" className="btn btn-default">
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body ">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.map((user, index) => (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td>
                              <button className="btn btn-default btn-sm mr-2">
                                View
                              </button>
                              <button className="btn btn-info btn-sm mr-2">
                                Edit
                              </button>
                              <button className="btn btn-danger btn-sm mr-2">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </animated.div>
  )
}

export default ManageUser
