import React, { useState } from "react"
import { animated, useSpring } from "react-spring"

function Marker({ handleMarkerClick }) {
  let [width, setWidth] = useState(30)
  let [height, setHeight] = useState(30)

  let [animatedProps, setAnimatedProps] = useState(
    useSpring({
      to: {
        width: width,
        height: height
        // marginLeft: 0
      },

      from: {
        width: 30,
        height: 30
        // marginLeft: -500
      },
      delay: 100
    })
  )

  const handleMouseOver = () => {
    setWidth(50)
    setHeight(50)
  }

  const handleMouseOut = () => {
    setWidth(30)
    setHeight(30)
  }

  return (
    <>
      <animated.img
        style={{
          ...animatedProps,
          cursor: "pointer",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50% )"
        }}
        onMouseOver={() => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
        onClick={() => handleMarkerClick()}
        src={require("./img/marker.png")}
      />
    </>
  )
}

export default Marker
