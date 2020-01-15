import React, { useEffect, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import "./clientstyle.css"
import firebase from "firebase/app"
import database from "firebase/database"

import CardFooter from "../common/CardFooter"
import { ChartContext } from "../../../context/ChartContext"

const ClientModal = ({ isOpen, toggle, from }) => {
   let [waterLevel, setWaterLevel] = useState(0)
   let [color, setColor] = useState("")
   let [textColor, setTextColor] = useState("")

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

   //The use effect function will run every time this component (ClientModal) will be called
   //or shown or mounted. Every time this component is show we are fetching data from database
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
            let key = Object.values(snap.val())

            //The variable key[0] is the current water level

            //if the current water level is less than or equal to 60.96
            //change the background color to #f2d600 and text color to  rgba(0,0,0,.65)-- normal water level
            //else if the current water level is greater than 60.96 and less than or equal to 121.92
            //change the background color to #ff9f1a and text color to  rgba(0,0,0,.65) --average water level
            //else if the current water level is greater than 121.92
            //change the background color to #eb5a46 and text color to  rgba(255,255,255,.87) -- critical water level
            setWaterLevel(key[0])
            if (key[0] <= 0.05) {
               setColor("#f2d600")
               setTextColor("rgba(0,0,0,.65)")
            } else if (key[0] > 0.05 && key[0] <= 0.1) {
               setColor("#ff9f1a")
               setTextColor("rgba(0,0,0,.65)")
            } else if (key[0] > 0.1) {
               setColor("#eb5a46")
               setTextColor("rgba(255,255,255,.87)")
            }
         })
   }, [])

   return (
      <div>
         <Modal size="sm" isOpen={isOpen} toggle={() => toggle()}>
            <ModalHeader toggle={toggle}>Water level report</ModalHeader>
            <ModalBody className="text-center">
               <div className="row">
                  <div
                     className="col-md-5 offset-md-3"
                     style={{ marginLeft: "15%" }}
                  >
                     <div className="card cardwidth">
                        <div className="card-body">
                           <div
                              style={{
                                 backgroundColor: color,
                                 padding: 5,
                                 borderRadius: 5
                              }}
                           >
                              {/* This line of codes will show the current water level in meters 
                        This will be shown in the client side
                        output sample "100 meters"
                        The waterLevel variable inside the {} is a dynamic value that we've fetch from the firebase
                        database. (Fetch function is located at the top in useEffect())
                    */}
                              <p
                                 className="card-text font-weight-bold"
                                 style={{ fontSize: 30, color: textColor }}
                              >
                                 {waterLevel} meters
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-12 ">
                     <div className="row">
                        <div className="col-md-4">
                           <div
                              style={{
                                 width: "100%",
                                 height: 15,
                                 backgroundColor: "#f2d600",
                                 borderRadius: 5
                              }}
                           ></div>
                           <span>LOW </span>
                           <br />
                           <span style={{ fontSize: 12 }}>
                              (0.05 meters below)
                           </span>
                        </div>
                        <div className="col-md-4">
                           <div
                              style={{
                                 width: "100%",
                                 height: 15,
                                 backgroundColor: "#ff9f1a",
                                 borderRadius: 5
                              }}
                           ></div>
                           <span>AVERAGE </span>
                           <br />
                           <span style={{ fontSize: 12 }}>
                              (0.05 to 0.10 meters)
                           </span>
                        </div>
                        <div className="col-md-4">
                           <div
                              style={{
                                 width: "100%",
                                 height: 15,
                                 backgroundColor: "#eb5a46",
                                 borderRadius: 5,
                                 alignSelf: "center"
                              }}
                           ></div>
                           <span>CRITICAL </span>
                           <br />
                           <span style={{ fontSize: 12 }}>
                              (Above 0.10 meters)
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* <CurrentDate />
          <CardFooter /> */}
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

export default ClientModal
