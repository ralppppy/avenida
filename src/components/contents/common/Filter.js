import React, { useContext } from "react"
import { ChartContext } from "../../../context/ChartContext"

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
          <option>2019</option>
          <option>2018</option>
        </select>
      </div>

      <div className="col-md-2">
        <label>{title} Month</label>
        <select
          // style={{ paddingRight: 3, paddingLeft: 6 }}
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
          name={`${title}Month`}
        >
          {MONTH.map((m, i) => (
            <option value={m} key={i}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <label>{title} Day</label>
        <select
          onChange={e => handleChange(e)}
          className="form-control  input-sm"
          name={`${title}Day`}
        >
          {DAY.map((m, i) => (
            <option value={m} key={i}>
              {m}
            </option>
          ))}
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
          {HOUR.map((h, i) => (
            <option key={i}>{h}</option>
          ))}
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
          {secMin.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Filter
