import React from "react"
import moment from "moment"

function CurrentDate() {
  return (
    <div className="row">
      <div className="col-md-12">
        <p className="text-center">
          <strong>{moment().format("MMMM DD, YYYY - dddd hh:mm:ss A")}</strong>
        </p>
      </div>
    </div>
  )
}

export default CurrentDate
