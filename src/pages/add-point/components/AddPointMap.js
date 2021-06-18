import React, {useState} from 'react';
import styles from "./AddPointMap.module.css";
import GoogleMapReact from "google-map-react";
import Point from "./Point";

const AddPointMap = (props) => {
    const [position, setPosition] = useState(null)
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
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}`}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onClick={clickMap}
                >
                    {position && <Point
                        lat={position.lat}
                        lng={position.lng}
                    />}
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default AddPointMap;
