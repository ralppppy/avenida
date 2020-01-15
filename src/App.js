import React, { useContext, Suspense } from "react"
import logo from "./logo.svg"
//import "./App.css"

import Wrapper from "./components/wrapper/Wrapper"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import MainSidebar from "./components/common/MainSidebar"
import MainFooter from "./components/common/MainFooter"
import Dashboard from "./components/contents/dashboard/Dashboard"
import Error404 from "./components/contents/Error404"
import Login from "./components/login/Login"
import ProtectedRoute from "./protected/ProtectedRoute"
import LoginProtectedRoute from "./protected/LoginProtectedRoute"
import { AuthContext } from "./context/AuthContext"
import ManageUser from "./components/contents/manageuser/ManageUser"
import AddUser from "./components/contents/manageuser/AddUser"
import Map from "./components/contents/map/Map"
import { ChartContextProvider } from "./context/ChartContext"
import "admin-lte/plugins/jquery/jquery.js"
import Home from "./clientcomponents/Home"

function App() {
   let { token } = useContext(AuthContext)
   let token1 = window.localStorage.getItem("TOKEN")
   let AdminComponents = [Wrapper, MainSidebar, Navbar]

   return (
      <div className="App">
         <Router>
            <Switch>
               {/* Admin Routes */}
               {/* Manage User */}

               <ProtectedRoute
                  path="/admin/manage-users"
                  exact
                  components={[...AdminComponents, ManageUser]}
               />
               <ProtectedRoute
                  path="/admin/add-user"
                  exact
                  components={[...AdminComponents, AddUser]}
               />
               {/* Manage User */}
               {/* Login Route */}

               <LoginProtectedRoute
                  exact
                  path="/admin/login"
                  component={Login}
               />

               {/* Login Route */}

               <ProtectedRoute
                  path="/admin"
                  components={[...AdminComponents, Dashboard]}
                  exact
               />

               <ProtectedRoute
                  path="/admin/map"
                  exact
                  components={[...AdminComponents, Map]}
               />
               <ProtectedRoute path="/admin/" components={[MainFooter]} exact />

               <Route
                  path="/"
                  exact
                  render={() => (
                     <ChartContextProvider>
                        <Home />
                     </ChartContextProvider>
                  )}
               />
               <Route component={Error404} />

               {/* Admin Routes */}
            </Switch>
         </Router>
      </div>
   )
}

export default App
