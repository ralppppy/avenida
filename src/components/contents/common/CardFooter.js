import React, { useContext } from "react"
import { ChartContext } from "../../../context/ChartContext"

function CardFooter() {
  let { wlAveMeter } = useContext(ChartContext)

  return (
    <div className="card-footer">
      <div className="row">
        <div className="col-sm-3 col-6">
          <div className="description-block border-right">
            <h5 className="description-header">{wlAveMeter}</h5>
            <span className="description-text">
              AVERAGE WATER LEVEL IN METER
            </span>
          </div>
        </div>

        <div className="col-sm-3 col-6">
          <div className="description-block border-right">
            <span className="description-percentage text-warning">
              <i className="fas fa-caret-left"></i> 0%
            </span>
            <h5 className="description-header">$10,390.90</h5>
            <span className="description-text">TOTAL COST</span>
          </div>
        </div>

        <div className="col-sm-3 col-6">
          <div className="description-block border-right">
            <span className="description-percentage text-success">
              <i className="fas fa-caret-up"></i> 20%
            </span>
            <h5 className="description-header">$24,813.53</h5>
            <span className="description-text">TOTAL PROFIT</span>
          </div>
        </div>

        <div className="col-sm-3 col-6">
          <div className="description-block">
            <span className="description-percentage text-danger">
              <i className="fas fa-caret-down"></i> 18%
            </span>
            <h5 className="description-header">1200</h5>
            <span className="description-text">GOAL COMPLETIONS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardFooter
