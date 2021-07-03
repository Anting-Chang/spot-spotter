import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import styles from './Map.module.css'
import MapPoint from "./MapPoint";


const Map = (props) => {
    const center = {
            lat: 45.498478,
            lng: -73.567705,
        }
    const zoom = 15

    const [currentZoom, setCurrentZoom] = useState(zoom)
    const [clickIndex,setClickIndex] = useState()
    const [windowHeight, setWindowHeight] = useState(100)

    useEffect(() => {
        setWindowHeight(window.innerHeight)
    },[windowHeight])

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
            <div style={{ height: `100%`, width: '100%' }}>
                <MapContainer style={{ height: `${window.innerHeight}px`, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { currentZoom > 14 && props.pointsList && props.pointsList.length > 0 && props.pointsList.map((info, index) => {
                        return (
                            <Marker
                                position={{lat: info.lat, lng: info.lng}}
                                eventHandlers={{
                                    click: () => clickIcon(info, index),
                                }}
                            >
                                <Popup>
                                    <a href={`http://maps.google.com/?q=${info.lat},${info.lng}`}>Go to Google Map</a>
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
                {/*<GoogleMapReact*/}
                {/*    bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}`}}*/}
                {/*    defaultCenter={center}*/}
                {/*    defaultZoom={zoom}*/}
                {/*    onClick={clickMap}*/}
                {/*    onZoomAnimationEnd ={setZoom}*/}
                {/*>*/}
                {/*    { currentZoom > 14 && props.pointsList && props.pointsList.length > 0 && props.pointsList.map((info, index) => {*/}
                {/*        return (<MapPoint*/}
                {/*            lat={info.lat}*/}
                {/*            lng={info.lng}*/}
                {/*            info={info}*/}
                {/*            index={index}*/}
                {/*            clearClick={clickIndex}*/}
                {/*            onClickIcon={clickIcon}*/}
                {/*        />)*/}
                {/*    })*/}
                {/*    }*/}
                {/*</GoogleMapReact>*/}
            </div>
        </div>
    );
};

export default Map;
