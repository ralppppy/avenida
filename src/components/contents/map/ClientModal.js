import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./clientstyle.css";
import firebase from "firebase/app";
import database from "firebase/database";

import CardFooter from "../common/CardFooter";
import { ChartContext } from "../../../context/ChartContext";

const ClientModal = ({ isOpen, toggle, from }) => {
  let [waterLevel, setWaterLevel] = useState(0);
  let [color, setColor] = useState("");
  let [textColor, setTextColor] = useState("");

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
  };

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      // firebase.analytics()
    }

    const database = firebase.database().ref("avenida");

    database
      .child("water-level")
      .child("meter")
      .limitToLast(1)
      .on("value", snap => {
        //     snap.forEach(child => {

        //   })
        let key = Object.values(snap.val());
        console.log(key[0]);
        setWaterLevel(key[0]);
        if (key[0] <= 60.96) {
          console.log(1);
          setColor("#f2d600");
          setTextColor("rgba(0,0,0,.65)");
        } else if (key[0] > 60.96 && key[0] <= 121.92) {
          console.log(2);
          setColor("#ff9f1a");
          setTextColor("rgba(0,0,0,.65)");
        } else if (key[0] > 121.92) {
          console.log(3);
          setColor("#eb5a46");
          setTextColor("rgba(255,255,255,.87)");
        }
      });
  }, []);

  return (
    <div>
      <Modal size="sm" isOpen={isOpen} toggle={() => toggle()}>
        <ModalHeader toggle={toggle}>Water level report</ModalHeader>
        <ModalBody className="text-center">
          <div className="row">
            <div className="col-md-5 offset-md-3" style={{ marginLeft: "15%" }}>
              <div className="card cardwidth">
                <div className="card-body">
                  <div
                    style={{
                      backgroundColor: color,
                      padding: 5,
                      borderRadius: 5
                    }}
                  >
                    <p
                      className="card-text font-weight-bold"
                      style={{ fontSize: 30, color: textColor }}
                    >
                      {waterLevel} meters
                      {/* {waterLevel <= 3 && "LOW LEVEL"}
                      {waterLevel > 3 && waterLevel <= 6 && "AVERAGE LEVEL"}
                      {waterLevel > 6 && "CRITICAL LEVEL"} */}
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
                  <span style={{ fontSize: 12 }}>(61 meters below)</span>
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
                  <span style={{ fontSize: 12 }}>(61 to 122 meters)</span>
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
                  <span style={{ fontSize: 12 }}>(Above 122 meters)</span>
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
  );
};

export default ClientModal;
