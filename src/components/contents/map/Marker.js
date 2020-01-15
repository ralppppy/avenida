import React, { useState, useEffect } from "react"
import { animated, useSpring } from "react-spring"
import firebase from "firebase/app"
import database from "firebase/database"

function Marker({ handleMarkerClick }) {
   let [width, setWidth] = useState(30)
   let [height, setHeight] = useState(30)

   let [image, setImage] = useState("./img/marker_normal.png")

   // Config For firebase
   const firebaseConfig = {
      apiKey: "AIzaSyCijvVtGg4BFwXoC7jnbO9L4ChO4ivqgRA",
      authDomain: "avenida-1495f.firebaseapp.com",
      databaseURL: "https://avenida-1495f.firebaseio.com",
      projectId: "avenida-1495f",
      storageBucket: "avenida-1495f.appspot.com",
      messagingSenderId: "434841626247",
      appId: "1:434841626247:web:9605cee1aeb8dd46f6fa22",
      measurementId: "G-51EG3HD37Y"
   }
   // ---END---

   useEffect(() => {
      // Initialize Firebase
      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig)
         // firebase.analytics()
      }

      const database = firebase.database().ref("avenida")

      //QUery in firebase database to get the latest water level
      database
         .child("water-level")
         .child("meter")
         .limitToLast(1)
         .on("value", snap => {
            let key = Object.values(snap.val())

            //The variable key[0] is the current water level

            //if else logic---

            //if the current water level is less than or equal to 60.96
            //change the marker image to marker_normal.png -- normal water level
            //else if the current water level is greater than 60.96 and less than or equal to 121.92
            //change the marker image to marker_average.png --average water level
            //else if the current water level is greater than 121.92
            //change the marker image to marker.png -- critical water level

            if (key[0] <= 0.05) {
               setImage("./img/marker_normal.png")
            } else if (key[0] > 0.05 && key[0] <= 0.1) {
               setImage("./img/marker_average.png")
            } else if (key[0] > 0.1) {
               setImage("./img/marker.png")
            }
         })
   }, [])

   let [animatedProps, setAnimatedProps] = useState(
      useSpring({
         to: {
            width: width,
            height: height
         },

         from: {
            width: 30,
            height: 30
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
            src={require(`${image}`)}
         />
      </>
   )
}

export default Marker
