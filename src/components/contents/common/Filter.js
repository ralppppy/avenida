import React, { useContext } from "react"
import { ChartContext } from "../../../context/ChartContext"

/*
This is the component filter. It will filter the data that will be shown in the chart

setFromYear,
setFromMonth,
setFromDay,
setFromHour,
setFromMinute,
setFromSecond,
-> this Variables is for the date "from" which means the start date

setToYear,
setToMonth,
setToDay,
setToHour,
setToMinute,
setToSecond
-> this Variables is for the date "to" which means the end date

---*/

function Filter({ MONTH, DAY, HOUR, secMin, title }) {
  let {
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
  } = useContext(ChartContext)

  const handleChange = e => {
    let name = e.currentTarget.name
    let value = e.currentTarget.value

    console.log(name, value)

    switch (name) {
      case "FromYear":
        setFromYear(value)
        break
      case "FromMonth":
        setFromMonth(value)
        break
      case "FromDay":
        setFromDay(value)
        break
      case "FromHour":
        setFromHour(value)
        break
      case "FromMinute":
        setFromMinute(value)
        break
      case "FromSecond":
        setFromSecond(value)
        break
      case "ToYear":
        setToYear(value)
        break
      case "ToMonth":
        setToMonth(value)
        break
      case "ToDay":
        setToDay(value)
        break
      case "ToHour":
        setToHour(value)
        break
      case "ToMinute":
        setToMinute(value)
        break
      case "ToSecond":
        setToSecond(value)
        break
      default:
        break
    }
  }

  return (
    <>
      <br />
      <div className="col-md-2">
        <label>{title} Year</label>
        <select
          name={`${title}Year`}
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
        >
          <option>2020</option>
          <option>2019</option>
          <option>2018</option>
        </select>
      </div>

      <div className="col-md-2">
        <label>{title} Month</label>
        <select
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
          name={`${title}Month`}
        >
          {/* looping the MONTH variable */}
          {MONTH.map((m, i) => (
            <option value={m} key={i}>
              {m}
            </option>
          ))}
          {/* ---END--- */}
        </select>
      </div>
      <div className="col-md-2">
        <label>{title} Day</label>
        <select
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
          name={`${title}Day`}
        >
          {/* looping the DAY variable */}

          {DAY.map((m, i) => (
            <option value={m} key={i}>
              {m}
            </option>
          ))}
          {/* ---END--- */}
        </select>
      </div>
      <div className="col-md-2">
        <label>{title} Hour</label>
        <select
          defaultValue={title == "To" ? "23" : "01"}
          name={`${title}Hour`}
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
        >
          {/* looping the HOUR variable */}
          {HOUR.map((h, i) => (
            <option key={i}>{h}</option>
          ))}
          {/* ---END--- */}
        </select>
      </div>
      <div className="col-md-2">
        <label>{title} Minute/s</label>
        <select
          defaultValue={title == "To" ? "59" : "01"}
          name={`${title}Minute`}
          onChange={e => handleChange(e)}
          className="form-control input-sm"
        >
          {secMin.map((m, i) => (
            <option key={i}>{m}</option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label>{title} Second/s</label>
        <select
          defaultValue={title == "To" ? "59" : "01"}
          name={`${title}Second`}
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
        >
          {/* looping the secMin variable */}
          {secMin.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
          {/* ---END--- */}
        </select>
      </div>
    </>
  )
}

export default Filter
