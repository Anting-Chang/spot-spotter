import React, {useState, useEffect} from 'react';

import styles from './MapPoint.module.css'

const MapPoint = (props) => {
    const [borderColor, setBorderColor] = useState('#00cae9')

    const clickMapPoint = () => {
        setBorderColor('#00778A')
        props.onClickIcon(props.info, props.index)
    }

    useEffect(() => {
        if (props.clearClick !== props.index) {
            setBorderColor('#00CAE9')
        }
    }, [props.clearClick, props.index])

    return (
        <div onClick={clickMapPoint}>
            <div className={styles.pin} style={{borderColor: borderColor}}></div>
        </div>
    );
};

export default MapPoint;
