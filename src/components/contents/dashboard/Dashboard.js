import React, { useReducer, useContext } from "react"
import { useParams, withRouter } from "react-router-dom"

import axios from "axios"
import DashboardReducer from "./DashboardReducer"
import { ChartContext } from "../../../context/ChartContext"
import moment from "moment"
import _ from "lodash"
import { saveAs } from "file-saver"
import { useSpring, animated } from "react-spring"
import ContentHeader from "../common/ContentHeader"
import Chart from "../common/Chart"
import CurrentDate from "../common/CurrentDate"
import CardFooter from "../common/CardFooter"
import { Switch, Button, message } from "antd"

const initialState = {
   chartVisible: false
}

function Dashboard() {
   document.title = "Dashboard"

   let {
      setTopChartVisible,
      isTopChartVisible,
      measurement,
      setMesurement
   } = useContext(ChartContext)

   let [state, dispatch] = useReducer(DashboardReducer, initialState)

   setTopChartVisible(state.chartVisible)

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

   const updateValue = e => {
      e.preventDefault()
      //data.push(10000)
      console.log("realy")
   }

   const handleChartVisibility = e => {
      e.preventDefault()
      dispatch({ type: "CHART_VISIBILITY_TOGGLE" })
   }

   const changeDataShown = checked => {
      if (checked) {
         setMesurement("meter")
         localStorage.setItem("measurement", "meter")
      } else {
         localStorage.setItem("measurement", "feet")
         setMesurement("feet")
      }
   }

   return (
      <animated.div style={animatedProps}>
         <div className="content-wrapper">
            {/* Add Content header component -- Located at  src/components/contents/common/ContentHeader.js */}
            <ContentHeader title="Dashboard" />
            {/* Add Content header component -- Located at  src/components/contents/common/ContentHeader.js */}

            <section className="content">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-md-12">
                        <div className="card">
                           <div className="card-header">
                              <h5 className="card-title">Water level report</h5>

                              <div className="card-tools">
                                 <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                 >
                                    <i className="fas fa-minus"></i>
                                 </button>
                                 <div className="btn-group">
                                    <button
                                       type="button"
                                       className="btn btn-tool dropdown-toggle"
                                       data-toggle="dropdown"
                                    >
                                       <i className="fas fa-wrench"></i>
                                    </button>
                                    <div
                                       className="dropdown-menu dropdown-menu-right"
                                       role="menu"
                                    >
                                       <a href="#" className="dropdown-item">
                                          Action
                                       </a>
                                       <a href="#" className="dropdown-item">
                                          Another action
                                       </a>
                                       <a href="#" className="dropdown-item">
                                          Something else here
                                       </a>
                                       <a className="dropdown-divider"></a>
                                       <a href="#" className="dropdown-item">
                                          Separated link
                                       </a>
                                    </div>
                                 </div>
                                 <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                 >
                                    <i className="fas fa-times"></i>
                                 </button>
                              </div>
                           </div>

                           <div className="card-body">
                              <div className="row">
                                 <div className="col-md-12">
                                    <div className="chart">
                                       {/* This Button will toggle the visibility of Chart Filter in every Click 
                              handleChartVisibility function is located at the top
                          */}
                                       <button
                                          className="btn btn-primary btn-sm"
                                          onClick={e =>
                                             handleChartVisibility(e)
                                          }
                                       >
                                          {isTopChartVisible
                                             ? "Hide Filter"
                                             : "Show Filter"}
                                       </button>
                                       {/* ---END___*/}

                                       <hr />

                                       {/* 1: This Line is a switch that will change the measurement from meter to feet
                              and vice versa
                          */}
                                       <Switch
                                          defaultChecked={
                                             localStorage.getItem(
                                                "measurement"
                                             ) === "meter"
                                                ? true
                                                : false
                                          }
                                          onChange={checked =>
                                             changeDataShown(checked)
                                          }
                                       />
                                       {/* 2: This line of codes outputs "Showing data in meter / Showing data in feet 
                              depending on the state of the Switch
                          " */}
                                       <p>
                                          Showing data in{" "}
                                          {localStorage.getItem(
                                             "measurement"
                                          ) == "meter"
                                             ? measurement
                                             : measurement}
                                       </p>
                                       {/* ---END 2:--- */}
                                       {/* ---END 1:--- */}

                                       {/* This Line is to Add the Chart Component which will show a line graph 
                          thats represents the changes in water level.
                            This component is located at src/components/contents/common/Chart.js
                          */}
                                       <Chart height={100} />
                                       {/* ---END--- */}
                                    </div>
                                 </div>
                              </div>
                              <br />

                              {/* This Line will add the CurrentDate Component. 
                        The current date Component will show the current date.
                        located at src/components/contents/common/CurrentDate.js
                    */}
                              <CurrentDate />
                              {/* ---END--- */}
                           </div>

                           {/* This Line will add the CardFooter Component. 
                        The CardFooter Component will show the Average Water Level
                        that is currently shown in the chart.
                        located at src/components/contents/common/CardFooter.js
                    */}
                           <CardFooter />
                           {/* ---END--- */}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
         {/*  */}
      </animated.div>
   )
}

export default withRouter(Dashboard)
