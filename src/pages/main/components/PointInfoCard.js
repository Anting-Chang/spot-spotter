import React from 'react';
import { Button } from 'antd';

import styles from './PointInfoCard.module.css'
import {DAY_MAP, MONTH_MAP} from "../../../shared/util/DataMap";

const PointInfoCard = (props) => {
    return (
        <div className={styles.infoCardWrapper}>

            {props.info.limit && props.info.limit.map((month, index) => {
                return (
                    <div key={index}>
                        <div className={styles.monthWrapper}>{MONTH_MAP[month.monthStart]} to {MONTH_MAP[month.monthEnd]}</div>
                        <div className={styles.spliter}/>
                        {month.day.map((day, index) => {
                            return (
                                <div key={index} className={styles.dayWrapper}>
                                    <div className={styles.dayTitle}>{DAY_MAP[day.num]}:</div>
                                    <div className={styles.timeStyle}>
                                        {day.time.map((time, index) => {
                                            return (
                                                <div>{`${time.startHour}:${time.startMinute} to ${time.endHour}:${time.endMinute}`}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }) }
                        <div className={styles.spliter}/>
                    </div>
                )
            })}
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
                {props.info.creator === props.userId && <Button type="primary" danger onClick={() => props.onDeleteSpot()}>
                    Delete
                </Button>}
            </div>

        </div>
    );
};

export default PointInfoCard;
