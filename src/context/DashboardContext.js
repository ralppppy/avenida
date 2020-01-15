import React, { useReducer, createContext } from "react"
import ChartReducer from "../components/contents/common/reducers/ChartReducer"
import moment from "moment"

const DashboardContext = createContext()

function DashboardContextProvider({ children }) {
   const initialState = {
      wlmeter: [],
      wlfeet: [],
      date: [],
      aveWlMeter: 0,
      aveWlFeet: 0,
      fromUnix: moment()
         .subtract(5, "days")
         .unix(),
      toUnix: moment().unix(),
      dateAndData: []
   }

   let [state, dispatch] = useReducer(ChartReducer, initialState)

   return (
      <DashboardContext.Provider value={{ state, dispatch }}>
         {children}
      </DashboardContext.Provider>
   )
}

export { DashboardContextProvider, DashboardContext }
