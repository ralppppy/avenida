import React, { useContext, useEffect, useState } from "react"
import { ChartContext } from "../../../context/ChartContext"
import { DashboardContext } from "../../../context/DashboardContext"
import numeral from "numeral"
import firebase from "firebase/app"
import database from "firebase/database"
import { Switch, Button, message } from "antd"
import { saveAs } from "file-saver"
import moment from "moment"

import * as brain from "brain.js"
import Axios from "axios"

function CardFooter() {
   let { wlAveMeter } = useContext(ChartContext)
   let { state } = useContext(DashboardContext)

   let [prediction, setPrediction] = useState(0)
   let [meterArray, setMeterArray] = useState([])
   let [isPredicting, setPredicting] = useState(false)

   useEffect(() => {
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

      // Initialize Firebase
      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig)
         // firebase.analytics()
      }

      let allMeter = []

      const database = firebase.database().ref("avenida")

      database
         .child("water-level")
         .child("meter")
         .on("value", snap => {
            snap.forEach(child => {
               //adding all the water level data in an array to be pass to backend server
               //stored in allMeter
               allMeter.push(child.val())
            })
            //seting the meterArray state to the value of allMeter
            setMeterArray(allMeter)
         })
   }, [])

   /**
    * This (pred function) will be called when the  'Predict' button will be pressed
    */
   /**
    * Long short-term memory (LSTM) is an artificial recurrent neural network (RNN) architecture
    *  used in the field of deep learning. Unlike standard feedforward neural networks,
    *  LSTM has feedback connections. It can not only process single data points (such as images),
    * but also entire sequences of data (such as speech or video). For example,
    *  LSTM is applicable to tasks such as unsegmented, connected handwriting recognition,
    * speech recognition and anomaly detection in network traffic or IDS's
    * (intrusion detection systems).
    * source: https://en.wikipedia.org/wiki/Long_short-term_memory
    *
    * This line of codes uses brain.js
    * https://github.com/BrainJS/brain.js
    *
    * This will predict the next number base on the sequence of numbers given as an input
    * in net.train([[<arrayofinputs>]]) -> net.train() accepts two dimensional array
    * ex input [1,2,3,4,5,6,7,8,9,10]
    * it will look like this net.train([[1,2,3,4,5,6,7,8,9,10]])
    *
    * net.run() -> accepts an array that will be a basis on what will be the prediction
    * ex. net.run([7, 8, 9]) -> the output will be 10 because of the training data/datasets
    * that we've pass in net.train()
    * other example net.run([3, 4, 5]) output ->  6
    */

   const pred = async e => {
      e.preventDefault()
      setPredicting(true)
      message.loading(
         {
            content:
               "Predicting next water level in meter. This might take a while depending on the training datas. Do not close the tab.",
            key: "updatable"
         },
         5
      )

      setTimeout(() => {
         //create an object / initializing brain.js LSTMT
         const net = new brain.recurrent.LSTMTimeStep()

         //begin the training proccess meterArray contains the data that is currently shown in the chart
         net.train([meterArray])

         //Getting the latest three water level data we will use this  in net.run() it will
         //be the basis of the prediction
         let lastThree = meterArray.slice(Math.max(meterArray.length - 3, 1))

         //Predicting process
         const output = net.run(lastThree) // 3
         setPrediction(output < 0 ? "0.01" : output)
         message.success(
            {
               content: `The system has predicted that the next water level is ${output}`,
               key: "updatable"
            },
            10
         )
         setPredicting(false)
      }, 1000)
   }

   const genReport = e => {
      e.preventDefault()

      Axios.post("/api/pdf/create-pdf-report", {
         waterLevel: state.dateAndData
      }).then(res => {
         Axios.get("/api/pdf/fetch-pdf", {
            responseType: "blob"
         }).then(res => {
            const pdfblob = new Blob([res.data], { type: "application/pdf" })
            saveAs(
               pdfblob,
               `water-level-report-${moment().format("MM")}-${moment().format(
                  "Do"
               )}-${moment().format("YYYY")}.pdf`
            )
         })
      })
   }

   return (
      <div className="card-footer">
         <div className="row">
            <div className="col">
               <div className="description-block border-right">
                  <h5 className="description-header">{wlAveMeter}</h5>
                  <span className="description-text">
                     AVERAGE WATER LEVEL IN METER
                  </span>
               </div>
            </div>

            <div className="col">
               <div className="description-block border-right">
                  <h5 className="description-header">
                     {numeral(wlAveMeter * 3.28084).format("0.00")}
                  </h5>
                  <span className="description-text">
                     AVERAGE WATER LEVEL IN FEET
                  </span>
               </div>
            </div>
            <div className="col">
               <button
                  className="btn btn-primary btn-sm w-100 h-100"
                  onClick={e => genReport(e)}
                  disabled={isPredicting ? true : false}
               >
                  Generate Report For this data
               </button>
            </div>
            <div className="col">
               <div className="row">
                  <div className="col">
                     <button
                        className="btn btn-primary btn-sm w-100 h-100"
                        onClick={e => pred(e)}
                        disabled={isPredicting ? true : false}
                     >
                        Predict
                     </button>
                  </div>
                  <div className="col">
                     <div className="description-block border-right">
                        <h5 className="description-header">
                           {numeral(prediction).format("0.00")} meter
                        </h5>
                        <span className="description-text">Prediction</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CardFooter
