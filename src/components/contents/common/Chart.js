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

defaults.global.animation = false

const initialState = {
  wlmeter: [],
  wlfeet: [],
  date: [],
  aveWlMeter: 0,
  aveWlFeet: 0,
  fromUnix: moment()
    .subtract(5, "days")
    .unix(),
  toUnix: moment().unix()
}

function Chart({ height, width }) {
  let [state, dispatch] = useReducer(ChartReducer, initialState)

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
    isTopChartVisible
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
    apiKey: "AIzaSyCtSPKJnTHKGGAEQ_WOtmq-rKgpY2u2k7Y",
    authDomain: "gram-1d8ec.firebaseapp.com",
    databaseURL: "https://gram-1d8ec.firebaseio.com",
    projectId: "gram-1d8ec",
    storageBucket: "gram-1d8ec.appspot.com",
    messagingSenderId: "266406466814",
    appId: "1:266406466814:web:0491f01247c335c14f41af",
    measurementId: "G-1T1STSK4GV"
  }

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      // firebase.analytics()
    }

    let wlmeter = []
    let date = []
    let aveWlMeter = 0

    const database = firebase.database().ref("avenida")

    database
      .child("water-level")
      .child("meter")
      .on("value", snap => {
        snap.forEach(child => {
          if (
            parseInt(child.key) >= parseInt(fromUnix) &&
            parseInt(child.key) <= parseInt(toUnix)
          ) {
            let newDate = moment.unix(child.key).format("MMM  DD, hh:mm:ss A")
            wlmeter.push(child.val())
            date.push(newDate)
            aveWlMeter = _.sum(wlmeter)
            setWlEveMeter(numeral(aveWlMeter / wlmeter.length).format("0.00"))
            dispatch({
              type: "INSERT_WL_DATA",
              datas: { wlmeter, date, aveWlMeter }
            })
          } else {
            //console.log(fromUnix.toString(), toUnix.toString())
          }
        })

        wlmeter = []
        date = []
        aveWlMeter = 0
      })
  }, [fromUnix, toUnix])

  const handleFilter = e => {
    e.preventDefault()

    //"Sat Apr 30 2016 16:59:46 GMT-0500"
    let fromUnix = moment(
      `${FromMonth} ${FromDay} ${FromYear} ${FromHour}:${FromMinute}:${FromSecond} GMT+0800`
    ).unix()

    let toUnix = moment(
      `${ToMonth} ${ToDay} ${ToYear} ${ToHour}:${ToMinute}:${ToSecond} GMT+0800`
    ).unix()
    console.log(toUnix)
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
                    return value + " meter"
                  }
                }
              }
            ]
          }
        }}
      />
    </animated.div>
  )
}

export default Chart
