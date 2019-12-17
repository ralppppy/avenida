import React, { useState } from "react"
import GoogleMapReact from "google-map-react"
import Marker from "./Marker"
import Modal from "./CustomModal"
import ClientModal from "./ClientModal"

/*
This is component is for showing the Map
---*/

function MainMap(props) {
  const MAP_API_KEY = "AIzaSyD-UN-1uU1p_dcEbwKFyCgwQvElxCtq-YI"
  const defaultProps = {
    center: {
      lat: 6.9214,
      lng: 122.079
    },
    zoom: 10
  }
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const handleMarkerClick = () => {
    setModal(true)
  }

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card card-warning">
                <div className="card-body">
                  <div style={{ height: props.height, width: "100%" }}>
                    {/* 1: Adding this GoogleMapReact component will show a google map */}
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: MAP_API_KEY }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                      yesIWantToUseGoogleMapApiInternals
                      onGoogleApiLoaded={({ map, maps }) =>
                        handleApiLoaded(map, maps)
                      }
                    >
                      {/* 2: This is a marker Component and this will show a marker in the map 
                      the lat attribute represents the latitude and the lng attribute 
                      represents the latitude
                    */}
                      <Marker
                        handleMarkerClick={handleMarkerClick}
                        lat={7.011}
                        lng={122.079}
                        text="My Marker"
                      />
                      {/* ---END 2:--- */}
                    </GoogleMapReact>
                    {/* ---END 1:--- */}
                  </div>

                  {/* This Line of code will show a Modal after clicking the marker in the map.
                      ClientModal Component is located at src/components/contents/map/ClientModal.js
                      The ClientModal component will show the current water level of the marker that
                      has been clicked, and it indicates if the water level is normal, average, critical
                  */}
                  {typeof props.from !== "Client" ? (
                    <ClientModal
                      from={typeof props.from !== "undefined" ? props.from : ""}
                      isOpen={modal}
                      toggle={toggle}
                    />
                  ) : (
                    <Modal
                      from={typeof props.from !== "undefined" ? props.from : ""}
                      isOpen={modal}
                      toggle={toggle}
                    />
                  )}
                  {/* ---END--- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainMap
