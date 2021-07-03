import React, {useEffect, useState} from 'react';
import { Button } from 'antd';
import {
    BsFillCaretUpFill,
    BsFillCaretDownFill,
    BsFillCursorFill,
    BsPlusCircleFill,
    BsFillSlashCircleFill,
    BsGiftFill
} from "react-icons/bs"

import styles from './PointInfoCard.module.css'
import DetailLimitInfo from "./info-components/DetailLimitInfo";
import SimpleLimitInfo from "./info-components/SimpleLimitInfo";
import {DAY_MAP, MONTH_MAP} from "../../../shared/util/DataMap";

const PointInfoCard = (props) => {
    const [isDetailInfo, setIsDetailInfo] = useState(false)
    const [isMonthEmpty, setIsMonthEmpty] = useState(true)


    const addTrip = () => {
        props.onAddTrip(props.info)
    }

    const determineIfMonthShown = (val) => {
        setIsMonthEmpty(!val)
    }

    return (
        <div className={styles.infoCardWrapper}>
            {isDetailInfo && <div>
                <DetailLimitInfo {...props}/>
                <div className={styles.spotsWrapper}>
                    <div>Spots Amount :</div>
                    <div>{props.info.numSpots}</div>
                </div>
                <div className={styles.descriptionWrapper}>
                    <div>Description :</div>
                    <div style={{wordWrap: 'break-word'}}>{props.info.description}</div>
                </div>
                <div className={styles.positionWrapper}>
                    <div>{props.info.lat},{props.info.lng}</div>
                </div>
                <div className={styles.positionWrapper}>
                    <a href={`http://maps.google.com/?q=${props.info.lat},${props.info.lng}`}>Go to Google Map</a>

                </div>
                <div className={styles.positionWrapper}>
                    {props.info.creator === props.userId &&
                    <Button type="primary" danger onClick={() => props.onDeleteSpot()}>
                        Delete
                    </Button>}
                </div>
                <div className={styles.simpleExpand} onClick={() => setIsDetailInfo(prev => !prev)}>
                    <BsFillCaretUpFill />
                </div>
            </div>}
            {!isDetailInfo && <div>
                {isMonthEmpty && <div className={styles.monthEmptyPlaceholder}><BsGiftFill style={{color: '#27c200', fontSize: '0.9rem'}}/>&nbsp;&nbsp;No Restrictions Today</div>}
                <SimpleLimitInfo {...props} onShowMonth={determineIfMonthShown}/>
                <div className={styles.BtnWrapper}>
                    <a href={`http://maps.google.com/?q=${props.info.lat},${props.info.lng}`}>
                        <div className={styles.BtnDirection}>
                            <BsFillCursorFill style={{fontSize: '1rem'}}/>
                            <div>&nbsp;Direction</div>
                        </div>
                    </a>

                    <div className={styles.BtnAdd} onClick={addTrip}>
                        <BsPlusCircleFill style={{fontSize: '1rem'}}/>
                        <div>&nbsp;Add To Trip</div>
                    </div>
                </div>
                <div className={styles.simpleExpand} onClick={() => setIsDetailInfo(prev => !prev)}>
                    <BsFillCaretDownFill />
                </div>
            </div>}
        </div>
    );
};

export default PointInfoCard;
