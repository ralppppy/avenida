import React from "react"
import { animated, useSpring } from "react-spring"
import ContentHeader from "../common/ContentHeader"
import { Link } from "react-router-dom"

function AddUser() {
  document.title = "Add User"

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

  return (
    <animated.div style={animatedProps}>
      <div className="content-wrapper">
        <ContentHeader title="Add User" />

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="card card-warning">
                  <div className="card-body">
                    <form role="form">
                      <div className="form-group">
                        <label className="col-form-label" for="firstname">
                          First name
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          name="firstname"
                          placeholder="Enter First Name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="col-form-label" for="lastname">
                          Last name
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          name="lastname"
                          placeholder="Enter Last Name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="col-form-label" for="username">
                          Username
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          placeholder="Enter Username"
                        />
                      </div>
                      <div className="form-group">
                        <label className="col-form-label" for="email">
                          Email
                        </label>

                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="form-group">
                        <label>Type</label>
                        <select className="form-control">
                          <option>Type 1 Admin</option>
                          <option>Type 2 Maintainer</option>
                        </select>
                      </div>
                      <Link to="/manage-users">
                        <button className="btn btn-default mr-2">Back</button>
                      </Link>
                      <button className="btn btn-primary">Submit</button>
                    </form>
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

export default AddUser
