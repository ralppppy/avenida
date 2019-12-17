import React, { useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Chart from "../common/Chart"
import "./style.css"
import CurrentDate from "../common/CurrentDate"
import CardFooter from "../common/CardFooter"
import { ChartContext } from "../../../context/ChartContext"

//Currently we are not using this.

const CustomModal = ({ isOpen, toggle, from }) => {
  let { setTopChartVisible, isTopChartVisible } = useContext(ChartContext)

  const handleChartVisibility = e => {
    e.preventDefault()

    setTopChartVisible(!isTopChartVisible)
  }

  return (
    <div>
      <Modal
        size="sm"
        style={
          from == ""
            ? {}
            : {
                marginLeft: "6%"
              }
        }
        isOpen={isOpen}
        toggle={() => toggle()}
      >
        <ModalHeader toggle={toggle}>Water level report</ModalHeader>
        <ModalBody

        >
          {from == "" ? (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={e => handleChartVisibility(e)}
              >
                {isTopChartVisible ? "Hide Filter" : "Show Filter"}
              </button>
              <Chart height={200} width={500} />
              <br />
              <CurrentDate />
              <CardFooter />
            </>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CustomModal
