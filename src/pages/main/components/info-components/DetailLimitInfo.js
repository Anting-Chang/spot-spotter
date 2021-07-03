import React from 'react';
import styles from "./DetailLimitInfo.module.css";
import {DAY_MAP, MONTH_MAP} from "../../../../shared/util/DataMap";

const DetailLimitInfo = (props) => {
    return (
        <div>
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
                                                <div key={index}>{`${time.startHour}:${time.startMinute} to ${time.endHour}:${time.endMinute}`}</div>
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
        </div>
    );
};

export default DetailLimitInfo;