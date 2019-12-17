import React, { useContext } from "react"
import Filter from "../common/Filter"
import { animated, useSpring } from "react-spring"
import { ChartContext } from "../../../context/ChartContext"
import moment from "moment"

/*
This component will show all the values chosen in Filter component

values ->
setFromYear,
setFromMonth,
setFromDay,
setFromHour,
setFromMinute,
setFromSecond,
setToYear,
setToMonth,
setToDay,
setToHour,
setToMinute,
setToSecond

When the Okay button is click the firebase database query will trigger
---*/

function TopChart({ filterData, optionsData, handleFilter }) {
  let {
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
  } = filterData

  let { YEAR, MONTH, HOUR, DAY, secMin } = optionsData

  let { isTopChartVisible } = useContext(ChartContext)

  const animatedProps = useSpring({
    to: {
      opacity: 1
    },

    from: {
      opacity: 0
    },
    delay: 300
  })

  return (
    <>
      <animated.div style={animatedProps} className="col-md-9">
        <div className="row">
          <Filter
            title={"From"}
            MONTH={MONTH}
            DAY={DAY}
            HOUR={HOUR}
            secMin={secMin}
          />
          <div className="col-md-12"></div>
          <Filter
            title={"To"}
            MONTH={MONTH}
            DAY={DAY}
            HOUR={HOUR}
            secMin={secMin}
          />
        </div>
      </animated.div>
      <animated.div style={animatedProps} className="col-md-3">
        <div className="card " style={{ width: "90%", height: "100%" }}>
          <div className="card-body">
            <p className="card-text font-weight-bold">Will show data from</p>
            <p className="card-text">
              {FromMonth} {FromDay}, {FromYear} {FromHour}:{FromMinute}:
              {FromSecond}
            </p>
            <p className="card-text font-weight-bold">to</p>
            <p className="card-text">
              {ToMonth} {ToDay}, {ToYear} {ToHour}:{ToMinute}:{ToSecond}
            </p>
            <button
              onClick={e => handleFilter(e)}
              className="btn btn-primary form-control"
            >
              Okay
            </button>
          </div>
        </div>
      </animated.div>
    </>
  )
}

export default TopChart
