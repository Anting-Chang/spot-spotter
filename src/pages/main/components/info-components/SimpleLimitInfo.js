import React, {useEffect, useState} from 'react';
import styles from "./SimpleLimitInfo.module.css";
import {DAY_MAP, FULL_DAY_MAP, MONTH_MAP} from "../../../../shared/util/DataMap";
import { BsFillSlashCircleFill } from "react-icons/bs"
import { BiCar } from "react-icons/bi"

const SimpleLimitInfo = (props) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDay()
    let ifMonthShowFlag = false

    useEffect(() => {
        props.onShowMonth(ifMonthShowFlag)
    },[props.info])

    const listMonth = (month, index) => {
        const currentDate = new Date()
        let showMonthFlag = false
        for (let j = 0; j < month.day.length; j++ ) {
            if (month.day[j].num === currentDate.getDay() || month.day[j].num > 7) {
                showMonthFlag = true
            } else if (month.day[j].num === 7 && currentDate.getDay() > 0 && currentDate.getDay() < 6) {
                showMonthFlag = true
            }
        }
        if (showMonthFlag) {
            ifMonthShowFlag = true
            console.log('showMonthFlag reached');
            return (
                <>
                    {month.monthStart === month.monthEnd && <div className={styles.monthWrapper}><BsFillSlashCircleFill style={{color: 'red', fontSize: '0.9rem'}}/>&nbsp;&nbsp;All Year</div>}
                    {month.monthStart !== month.monthEnd && <div className={styles.monthWrapper}><BsFillSlashCircleFill style={{color: 'red', fontSize: '0.9rem'}}/>&nbsp;&nbsp;{MONTH_MAP[month.monthStart]} to {MONTH_MAP[month.monthEnd]}</div>}
                    {month.day.map((day, index) => {
                        return listDay(day,index)
                    }) }
                </>
            )
        }
    }

    const listDay = (day,index) => {
        if ((day.num === currentDate.getDay() || day.num > 7) || (day.num === 7 && currentDate.getDay() > 0 && currentDate.getDay() < 6)) {
            return (
                <div key={index} className={styles.dayWrapper}>
                    <div className={styles.dayTitle}>Today&nbsp;</div>
                    <div className={styles.timeStyle}>
                        {day.time.map((time, index) => {
                            return (
                                <div key={index}>• {`${time.startHour}:${time.startMinute} to ${time.endHour}:${time.endMinute}`}</div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    };

    return (
        <div>
            {props.info.limit && props.info.limit.map((month, index) => {
                return (
                    <div key={index}>
                        {listMonth(month,index)}
                    </div>
                )
            })}
            <div className={styles.spotsStyle}><BiCar/> • {props.info.numSpots} spots</div>
        </div>
    );
};

export default SimpleLimitInfo;