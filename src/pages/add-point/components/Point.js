import React from 'react';

import styles from './Point.module.css'
import {useMapEvents} from "react-leaflet";

const Point = (props) => {
    const map = useMapEvents({
        click: (e) => {
            console.log(e)
            props.onClickPoint(e.latlng)
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
    /*return (
        <div>
            <div className={`${styles.pin} ${styles.bounce}`}></div>
            <div className={styles.pulse}></div>
        </div>
    );*/
};

export default Point;
