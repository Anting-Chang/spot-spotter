import React, {useEffect, useState} from 'react';
import styles from "./SimpleLimitInfo.module.css";
import {DAY_MAP, FULL_DAY_MAP, MONTH_MAP, RULE_MAP} from "../../../../shared/util/DataMap";
import {BsFillSlashCircleFill, BsExclamationTriangleFill, BsGiftFill} from "react-icons/bs"
import { BiCar } from "react-icons/bi"

const SimpleLimitInfo = (props) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDay()
    let ifMonthShowFlag = false
    const [showEmptyMessage, setShowEmptyMessage] = useState(false)

    useEffect(() => {
        setShowEmptyMessage(!ifMonthShowFlag)
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
                    {/*{month.monthStart === month.monthEnd && <div className={styles.monthWrapper}><BsFillSlashCircleFill style={{color: 'red', fontSize: '0.9rem'}}/>&nbsp;&nbsp;All Year</div>}*/}
                    {/*{month.monthStart !== month.monthEnd && <div className={styles.monthWrapper}><BsFillSlashCircleFill style={{color: 'red', fontSize: '0.9rem'}}/>&nbsp;&nbsp;{MONTH_MAP[month.monthStart]} to {MONTH_MAP[month.monthEnd]}</div>}*/}
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
                    {/*<div className={styles.dayTitle}>Today&nbsp;</div>*/}
                    {day.time.map((time, index) => {
                        return (
                            <div className={styles.timeStyle}>
                                <div style={{width: '1.5rem'}}>
                                    {(!time.rule || time.rule <= 1) && <BsFillSlashCircleFill style={{color: 'red', fontSize: '0.8rem'}}/>}
                                    {time.rule > 1 && <BsExclamationTriangleFill style={{color: '#FF9A00', fontSize: '0.8rem'}}/>}
                                </div>
                                <div key={index}>Today • {`${time.startHour}:${time.startMinute} to ${time.endHour}:${time.endMinute}${time.rule > 0 ? (` • ${RULE_MAP[time.rule]}`) : ''}`}</div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    };

    return (
        <div>
            <div style={{paddingTop: '0.5rem'}}>
                {showEmptyMessage && <div className={styles.monthEmptyPlaceholder}>
                    <div style={{width: '1.5rem'}}>
                        <BsGiftFill style={{color: '#27c200', fontSize: '0.8rem'}}/>
                    </div>
                    <div>No Restrictions Today</div>
                </div>}
                {props.info.limit && props.info.limit.map((month, index) => {
                    return (
                        <div key={index}>
                            {listMonth(month,index)}
                        </div>
                    )
                })}
                <div className={styles.spotsStyle}>
                    <BiCar/>
                    <div>&nbsp;• {props.info.numSpots} spots</div>
                </div>
            </div>
        </div>
    );
};

export default SimpleLimitInfo;