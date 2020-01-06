import React, { createContext, useState } from "react"
import Dashboard from "../components/contents/dashboard/Dashboard"
import Map from "../components/contents/map/Map"

export const ChartContext = createContext()

export const ChartContextProvider = ({ children }) => {
  let [wlAveMeter, setWlEveMeter] = useState(0)
  let [FromYear, setFromYear] = useState(2020)
  let [FromMonth, setFromMonth] = useState("January")
  let [FromDay, setFromDay] = useState("01")
  let [FromHour, setFromHour] = useState("01")
  let [FromMinute, setFromMinute] = useState("01")
  let [FromSecond, setFromSecond] = useState("01")
  let [ToYear, setToYear] = useState(2020)
  let [ToMonth, setToMonth] = useState("January")
  let [ToDay, setToDay] = useState("01")
  let [ToHour, setToHour] = useState("23")
  let [ToMinute, setToMinute] = useState("59")
  let [ToSecond, setToSecond] = useState("59")
  let [isTopChartVisible, setTopChartVisible] = useState(false)
  let [measurement, setMesurement] = useState(
    localStorage.getItem("measurement")
      ? localStorage.getItem("measurement")
      : "meter"
  )

  return (
    <ChartContext.Provider
      value={{
        wlAveMeter,
        setWlEveMeter,
        FromYear,
        setFromYear,
        FromMonth,
        setFromMonth,
        FromDay,
        setFromDay,
        FromHour,
        setFromHour,
        FromMinute,
        setFromMinute,
        FromSecond,
        setFromSecond,
        ToYear,
        setToYear,
        ToMonth,
        setToMonth,
        ToDay,
        setToDay,
        ToHour,
        setToHour,
        ToMinute,
        setToMinute,
        ToSecond,
        setToSecond,
        isTopChartVisible,
        setTopChartVisible,
        measurement,
        setMesurement
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}
