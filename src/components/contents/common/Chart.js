import React, { useEffect, useReducer, useContext } from "react"
import { Bar, Line, Pie, defaults } from "react-chartjs-2"
import firebase from "firebase/app"
import database from "firebase/database"
import _ from "lodash"
import moment from "moment"
import ChartReducer from "./reducers/ChartReducer"
import { useSpring, animated } from "react-spring"
import { ChartContext } from "../../../context/ChartContext"
import numeral from "numeral"
import TopChart from "./TopChart"
import { DashboardContext } from "../../../context/DashboardContext"
defaults.global.animation = false

// const initialState = {
//    wlmeter: [],
//    wlfeet: [],
//    date: [],
//    aveWlMeter: 0,
//    aveWlFeet: 0,
//    fromUnix: moment()
//       .subtract(5, "days")
//       .unix(),
//    toUnix: moment().unix()
// }

function Chart({ height, width }) {
   let { state, dispatch } = useContext(DashboardContext)

   // let [state, dispatch] = useReducer(ChartReducer, initialState)

   let { toUnix, fromUnix } = state

   let {
      setWlEveMeter,
      FromYear,
      FromMonth,
      FromDay,
      FromHour,
      FromMinute,
      FromSecond,
      ToYear,
      ToMonth,
      ToDay,
      ToHour,
      ToMinute,
      ToSecond,
      isTopChartVisible,
      measurement,
      setMesurement
   } = useContext(ChartContext)

   const MONTH = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
   ]

   const HOUR = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23"
   ]

   const secMin = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59"
   ]

   const DAY = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31"
   ]

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

   const firebaseConfig = {
      apiKey: "AIzaSyCijvVtGg4BFwXoC7jnbO9L4ChO4ivqgRA",
      authDomain: "avenida-1495f.firebaseapp.com",
      databaseURL: "https://avenida-1495f.firebaseio.com",
      projectId: "avenida-1495f",
      storageBucket: "avenida-1495f.appspot.com",
      messagingSenderId: "434841626247",
      appId: "1:434841626247:web:9605cee1aeb8dd46f6fa22",
      measurementId: "G-51EG3HD37Y"
   }

   useEffect(() => {
      // Initialize Firebase
      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig)
         // firebase.analytics()
      }

      console.log("Run ulit")

      let wlmeter = []
      let date = []
      let aveWlMeter = 0
      let allData = []

      const database = firebase.database().ref("avenida")

      database
         .child("water-level")
         .child("meter")
         .on("value", snap => {
            snap.forEach(child => {
               /*
          child.key is the key from the database this key is in unix timestamp

          The default value of fromUnix when not using the filter--
          fromUnix is a unix timestamp 5 days ago from this current time
          The default value of fromUnix is initialize above inside initialState variable

          The default value of toUnix when not using the filter--
          toUnix is the current time
          The default value of toUnix is initialize above inside initialState variable


          fromUnix and toUnix will change its value when using the filter component

          --- if statement logic ---
          if child.key greater than or equal to fromUnix and less than or equal to toUnix
          if the value of fromUnix and toUnix is defaul we are only getting the water level
          data 5 days ago until now, and if the two variable is not default it will depend on
          what time the user will set on the filter component

          Filter component is located at src/components/contents/common/Filter.js
          ---*/

               if (
                  parseInt(child.key) >= parseInt(fromUnix) &&
                  parseInt(child.key) <= parseInt(toUnix)
               ) {
                  allData.push({ date: child.key, data: child.val() })

                  let newDate = moment
                     .unix(child.key)
                     .format("MMM DD YYYY, hh:mm:ss A")
                  if (measurement === "meter") {
                     wlmeter.push(child.val())
                  } else {
                     wlmeter.push(
                        parseInt(numeral(child.val() * 3.28084).format("0.00"))
                     )
                  }
                  date.push(newDate)
                  aveWlMeter = _.sum(wlmeter)
                  setWlEveMeter(
                     numeral(aveWlMeter / wlmeter.length).format("0.00")
                  )

                  dispatch({
                     type: "INSERT_WL_DATA",
                     datas: { wlmeter, date, aveWlMeter }
                  })
               } else {
                  dispatch({
                     type: "INSERT_WL_DATA",
                     datas: { wlmeter, date, aveWlMeter }
                  })
                  //console.log(fromUnix.toString(), toUnix.toString())
               }
            })

            dispatch({ type: "INSERT_ALL_DATA", allData })

            wlmeter = []
            date = []
            aveWlMeter = 0
         })
   }, [fromUnix, toUnix, measurement])

   const handleFilter = e => {
      e.preventDefault()

      console.log(
         `${FromMonth} ${FromDay} ${FromYear} ${FromHour}:${FromMinute}:${FromSecond} GMT+0800`,
         `${ToMonth} ${ToDay} ${ToYear} ${ToHour}:${ToMinute}:${ToSecond} GMT+0800`
      )
      //"Sat Apr 30 2016 16:59:46 GMT-0500"
      let fromUnix = moment(
         `${FromMonth} ${FromDay} ${FromYear} ${FromHour}:${FromMinute}:${FromSecond} GMT+0800`
      ).unix()

      let toUnix = moment(
         `${ToMonth} ${ToDay} ${ToYear} ${ToHour}:${ToMinute}:${ToSecond} GMT+0800`
      ).unix()
      dispatch({ type: "FILTER", fromUnix, toUnix })
   }

   return (
      <animated.div style={animatedProps}>
         <div className="row">
            {isTopChartVisible && (
               <TopChart
                  handleFilter={handleFilter}
                  filterData={{
                     FromYear,
                     FromMonth,
                     FromDay,
                     FromHour,
                     FromMinute,
                     FromSecond,
                     ToYear,
                     ToMonth,
                     ToDay,
                     ToHour,
                     ToMinute,
                     ToSecond
                  }}
                  optionsData={{ MONTH, HOUR, DAY, secMin }}
               />
            )}
         </div>

         {/* This line of code will show the Line graph with data gatherd 
      from the database.*/}
         <Line
            height={height}
            width={width}
            data={{
               labels: [...state.date],

               datasets: [
                  {
                     label: "Water level",
                     data: [...state.wlmeter],

                     backgroundColor: "rgba(0,119,190, .6)"
                  }
               ]
            }}
            options={{
               title: {
                  display: true,
                  text: "Water Level",
                  fontSize: 25
               },
               legend: {
                  display: true,
                  position: "right"
               },
               scales: {
                  yAxes: [
                     {
                        ticks: {
                           // Include a dollar sign in the ticks
                           callback: function(value, index, values) {
                              let m = ""
                              if (measurement == "meter") {
                                 m = " meter"
                              } else {
                                 m = " feet"
                              }

                              return value + m
                           }
                        }
                     }
                  ]
               }
            }}
         />
         {/* ---END--- */}
      </animated.div>
   )
}

export default Chart
