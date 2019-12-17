import React, { useState } from "react"
import ContentHeader from "../common/ContentHeader"

import { useSpring, animated } from "react-spring"
import MainMap from "./MainMap"

function Map(props) {
  document.title = "Map"

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
    <animated.div style={animatedProps}>
      <div
        className={typeof props.from == "undefined" ? "content-wrapper" : ""}
      >
        {/* Add Content Header Component*/}
        <ContentHeader title="Map" />
        {/* ---END--- */}

        {/* Add MainMap Component 
          MainMap Component will show the a Map that has a marker that
           shows the river locaition
           file location is in src/components/contents/map/MainMap.js
        */}
        <MainMap height="65vh" />
        {/* ---END--- */}
      </div>
    </animated.div>
  )
}

export default Map
