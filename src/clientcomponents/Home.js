import React from "react"
import Chart from "../components/contents/common/Chart"
import Map from "../components/contents/map/Map"
import MainMap from "../components/contents/map/MainMap"
import "./style.css"

function Home() {
  document.title = "Avenida"

  return (
    <div
      style={{ backgroundColor: "rgba(15, 94, 156, 0.6)", paddingBottom: 30 }}
      className="row"
    >
      <div className="col mt-5">
        <MainMap height="75vh" from="Client" />
      </div>
    </div>
  )
}

export default Home
