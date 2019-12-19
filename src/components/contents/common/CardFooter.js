import React, { useContext, useEffect, useState } from "react"
import { ChartContext } from "../../../context/ChartContext"
import numeral from "numeral"
import firebase from "firebase/app"
import database from "firebase/database"
import { Switch, Button, message } from "antd"

import * as brain from "brain.js"
import Axios from "axios"

function CardFooter() {
  let { wlAveMeter } = useContext(ChartContext)

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

  const pred = e => {
    e.preventDefault()
    setPredicting(true)
    message.loading(
      {
        content: "Predicting next water level in meter",
        key: "updatable"
      },
      10
    )
    //Sent a post request from backend and the backend will return an object
    //that contains the prediction example {prediction: 12}
    //we pass meterArr as an object
    Axios.post("/api/predict/", { meterArr: meterArray })
      .then(_res => {
        let data = _res.data
        setPrediction(data.prediction)
        message.success(
          {
            content: `The system has predicted that the next water level is ${data.prediction}`,
            key: "updatable"
          },
          5
        )
        setPredicting(false)
      })
      .catch(error => console.log(error))
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
