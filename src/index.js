import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { AuthContextPrivider } from "./context/AuthContext"
import * as serviceWorker from "./serviceWorker"

import "admin-lte/plugins/fontawesome-free/css/all.min.css"
//import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
import "admin-lte/dist/css/adminlte.min.css"
//import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
//import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
import "admin-lte/dist/js/adminlte.js"
//import "admin-lte/plugins/jquery-mousewheel/jquery.mousewheel.js"
//import "admin-lte/plugins/raphael/raphael.min.js"
//import "admin-lte/plugins/jquery-mapael/maps/usa_states.min.js"
//import "admin-lte/plugins/chart.js/Chart.min.js"
//import "admin-lte/dist/js/pages/dashboard2.js"
//import "admin-lte/dist/js/demo.js"
import "antd/dist/antd.css"
import { DashboardContextProvider } from "./context/DashboardContext"
let jQuery = require("admin-lte/plugins/jquery/jquery.js")
ReactDOM.render(
   <AuthContextPrivider>
      <DashboardContextProvider>
         <App />
      </DashboardContextProvider>
   </AuthContextPrivider>,
   document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
