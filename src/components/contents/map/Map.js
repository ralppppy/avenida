import React, { useState } from "react"
import ContentHeader from "../common/ContentHeader"

import { useSpring, animated } from "react-spring"
import MainMap from "./MainMap"

function Map(props) {
  document.title = "Map"

  console.log(props.from)

  const animatedProps = useSpring({
    to: {
      opacity: 1
      // marginLeft: 0
    },

    from: {
      opacity: 0
      // marginLeft: -500
    },
    delay: 300
  })

  return (
    <animated.div style={animatedProps}>
      <div
        className={typeof props.from == "undefined" ? "content-wrapper" : ""}
      >
        <ContentHeader title="Map" />

        <MainMap height="65vh" />
      </div>
    </animated.div>
  )
}

export default Map
