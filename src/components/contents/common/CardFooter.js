import React, { useContext } from "react"
import { ChartContext } from "../../../context/ChartContext"
import numeral from "numeral"

function CardFooter() {
  let { wlAveMeter } = useContext(ChartContext)

  return (
    <div className="card-footer">
      <div className="row">
        <div className="col">
          <div className="description-block border-right">
            <h5 className="description-header">{wlAveMeter}</h5>
            <span className="description-text">
              AVERAGE WATER LEVEL IN METER
            </span>
          </div>
        </div>

        <div className="col">
          <div className="description-block border-right">
            <h5 className="description-header">
              {numeral(wlAveMeter * 3.28084).format("0.00")}
            </h5>
            <span className="description-text">
              AVERAGE WATER LEVEL IN FEET
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardFooter
