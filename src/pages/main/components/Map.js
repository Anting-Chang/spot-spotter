import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'

import styles from './Map.module.css'
import MapPoint from "./MapPoint";
import L from 'leaflet';
import markerRed from '../../../assets/red-marker.svg';
import markerBlue from '../../../assets/blue-marker.svg';
import { redIcon, blueIcon } from "./Icon";

const Map = (props) => {

    const center = {
            lat: 45.498478,
            lng: -73.567705,
        }
    const zoom = 15

    const [currentZoom, setCurrentZoom] = useState(zoom)
    const [clickId,setClickId] = useState()


    const clickMap = ({ x, y, lat, lng, event }) => {

        console.log(lat,lng)
    }
    const setZoom = (zoomLeve) => {
        setCurrentZoom(zoomLeve)
    }

    const clickIcon = (info) => {
        setClickId(info.id)
        props.onClickIcon(info)
    }

    const getMarkerIcon = (id) => {
        if (id === clickId) {
            return redIcon
        }
        return blueIcon
    }

    return (
        <div className={styles.pageWrapper}>
            <div style={{ height: `100%`, width: '100%' }}>
                <MapContainer style={{ height: `${window.innerHeight}px`, width: '100%' }} center={center} zoom={zoom} zoomControl={false} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position={"bottomright"}/>
                    { currentZoom > 14 && props.pointsList && props.pointsList.length > 0 && props.pointsList.map((info, index) => {
                        return (
                            <Marker
                                key={info.id}
                                icon={getMarkerIcon(info.id)}
                                position={{lat: info.lat, lng: info.lng}}
                                eventHandlers={{
                                    click: () => clickIcon(info),
                                }}
                            >
                            </Marker>
                        )
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
