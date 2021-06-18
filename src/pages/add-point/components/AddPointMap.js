import React, {useState} from 'react';
import styles from "./AddPointMap.module.css";
import GoogleMapReact from "google-map-react";
import Point from "./Point";
import {MapContainer, Marker, Popup, TileLayer, MapConsumer} from "react-leaflet";

const AddPointMap = (props) => {
    const [position, setPosition] = useState({
        lat: 45.498478,
        lng: -73.567705,
    })
    const center = {
        lat: 45.498478,
        lng: -73.567705,
    }
    const zoom = 17

    const clickMap = ({lat, lng}) => {
        setPosition({
            lat: lat,
            lng: lng
        })
        props.onChoosePoint({
            lat: lat,
            lng: lng
        })
    }

    return (
        <div className={styles.pageWrapper}>
            <div style={{ height: '100vh', width: '100%' }}>
                <MapContainer style={{ height: '100vh', width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Point onClickPoint={clickMap}/>
                    <Marker position={position}/>
                </MapContainer>
                {/*<GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}`}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onClick={clickMap}
                >
                    {position && <Point
                        lat={position.lat}
                        lng={position.lng}
                    />}
                </GoogleMapReact>*/}
            </div>
        </div>
    );
};

export default AddPointMap;
