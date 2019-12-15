import React, { useState, useEffect } from "react"
import { animated, useSpring } from "react-spring"
import firebase from "firebase/app"
import database from "firebase/database"

function Marker({ handleMarkerClick }) {
  let [width, setWidth] = useState(30)
  let [height, setHeight] = useState(30)

  let [image, setImage] = useState("./img/marker_normal.png")

  const firebaseConfig = {
    apiKey: "AIzaSyCijvVtGg4BFwXoC7jnbO9L4ChO4ivqgRA",
    authDomain: "avenida-1495f.firebaseapp.com",
    databaseURL: "https://avenida-1495f.firebaseio.com",
    projectId: "avenida-1495f",
    storageBucket: "avenida-1495f.appspot.com",
    messagingSenderId: "434841626247",
    appId: "1:434841626247:web:9605cee1aeb8dd46f6fa22",
    measurementId: "G-51EG3HD37Y"
    // apiKey: "AIzaSyCtSPKJnTHKGGAEQ_WOtmq-rKgpY2u2k7Y",
    // authDomain: "gram-1d8ec.firebaseapp.com",
    // databaseURL: "https://gram-1d8ec.firebaseio.com",
    // projectId: "gram-1d8ec",
    // storageBucket: "gram-1d8ec.appspot.com",
    // messagingSenderId: "266406466814",
    // appId: "1:266406466814:web:0491f01247c335c14f41af",
    // measurementId: "G-1T1STSK4GV"
  }

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      // firebase.analytics()
    }

    const database = firebase.database().ref("avenida")

    database
      .child("water-level")
      .child("meter")
      .limitToLast(1)
      .on("value", snap => {
        //     snap.forEach(child => {

        //   })
        let key = Object.values(snap.val())
        console.log(key[0])

        if (key[0] <= 60.96) {
          console.log(1)
          setImage("./img/marker_normal.png")
        } else if (key[0] > 60.96 && key[0] <= 121.92) {
          console.log(2)
          setImage("./img/marker_average.png")
        } else if (key[0] > 121.92) {
          setImage("./img/marker.png")
        }
      })
  }, [])

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
          transform: "translate(-50%, -50% )",
          color: "red"
        }}
        onMouseOver={() => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
        onClick={() => handleMarkerClick()}
        //  src={require("./img/marker.png")}
        src={require(`${image}`)}
      />
    </>
  )
}

export default Marker
