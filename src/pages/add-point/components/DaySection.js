import React, {useEffect,useState} from 'react';
import {DAY_MAP, MONTH_MAP} from "../../../shared/util/DataMap";
import {Button, Select, TimePicker} from "antd";

import styles from './DaySection.module.css'

const DaySection = (props) => {
    const [showAdd, setShowAdd] = useState(true)
    const [startTime, setStartTime] = useState({})
    const [endTime, setEndTime] = useState({})
    const [timeArray, setTimeArray] = useState([])

    const changeStartTime = (value, valueString) => {
        setStartTime({
            startHour: valueString.slice(0,2),
            startMinute: valueString.slice(3,5)
        })
    }

    const changeEndTime = (value, valueString) => {
        setEndTime({
            endHour: valueString.slice(0,2),
            endMinute: valueString.slice(3,5)
        })
    }

    const submitTime = () => {
        setTimeArray(prev => {
            let newArray = prev.concat({
                ...startTime,
                ...endTime
            })
            props.onSubmitTime(newArray,props.index)
            return newArray
        })
    }

    return (
        <div className={styles.daySectionWrapper}>
            <div className={styles.dayTitle}>{DAY_MAP[props.day.num]}</div>
            {timeArray && timeArray.length > 0 && timeArray.map((time, index) => {
                return (
                    <div key={index}>
                        <div>{time.startHour}:{time.startMinute} to {time.endHour}:{time.endMinute}</div>
                    </div>
                )
            })}
            {showAdd && <div>
                <TimePicker onChange={changeStartTime}/>
                <TimePicker onChange={changeEndTime}/>
                <Button style={{marginLeft: '10px'}} type="primary" onClick={submitTime}>Add</Button>
            </div>}
        </div>
    );
};

export default DaySection;
