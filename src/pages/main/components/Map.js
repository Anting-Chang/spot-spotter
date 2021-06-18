import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import styles from './Map.module.css'
import MapPoint from "./MapPoint";


const Map = (props) => {
    const center = {
            lat: 45.498478,
            lng: -73.567705,
        }
    const zoom = 17

    const [currentZoom, setCurrentZoom] = useState(zoom)
    const [clickIndex,setClickIndex] = useState()

    const clickMap = ({ x, y, lat, lng, event }) => {

        console.log(lat,lng)
    }
    const setZoom = (zoomLeve) => {
        setCurrentZoom(zoomLeve)
    }

    const clickIcon = (info, index) => {
        setClickIndex(index)
        props.onClickIcon(info)
    }

    return (
        <div className={styles.pageWrapper}>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}`}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onClick={clickMap}
                    onZoomAnimationEnd ={setZoom}
                >
                    { currentZoom > 14 && props.pointsList && props.pointsList.length > 0 && props.pointsList.map((info, index) => {
                        return (<MapPoint
                            lat={info.lat}
                            lng={info.lng}
                            info={info}
                            index={index}
                            clearClick={clickIndex}
                            onClickIcon={clickIcon}
                        />)
                    })
                    }
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default Map;
