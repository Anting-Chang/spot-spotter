import React, { useState, useEffect } from 'react';
import {DatePicker, Space, Button, Select} from 'antd';
import {DAY_MAP, MONTH_MAP} from "../../../shared/util/DataMap";
import DaySection from "./DaySection";
import styles from './MonthSection.module.css'
const { Option } = Select

const MonthSection = (props) => {
    const [dayArray, setDayArray] = useState([])
    const [selectedDay, setSelectedDay] = useState(1)


    const changeDay = (dayNum) => {
        setSelectedDay(dayNum)
        console.log(dayNum)
    }

    const submitDay = () => {
        setDayArray(prev => {
            console.log('day submitted',selectedDay)
            const newArray = prev.concat({
                num: selectedDay,
                time: []
            })
            console.log('day submitted',newArray)
            return newArray
        })
    }

    // from the day section
    const submitedTime = (value, index) => {
        setDayArray(prev => {
            prev[index].time = value
            console.log('submitted time',prev)
            props.onSubmitDay(prev, props.index)
            return prev
        })
    }

    return (
        <div className={styles.monthSectionWrapper}>
            <div className={styles.monthTitle}>{MONTH_MAP[props.month.monthStart]} to {MONTH_MAP[props.month.monthEnd]}</div>
            {dayArray && dayArray.length > 0 && dayArray.map((day, index) => {
                return (
                    <DaySection key={index} day={day} index={index} onSubmitTime={submitedTime} />
                )
            })}
            <div>
                <Select onChange={changeDay} defaultValue={1}>
                    <Option value={1}>Mon</Option>
                    <Option value={2}>Tue</Option>
                    <Option value={3}>Wed</Option>
                    <Option value={4}>Thu</Option>
                    <Option value={5}>Fri</Option>
                    <Option value={6}>Sat</Option>
                    <Option value={0}>Sun</Option>
                    <Option value={7}>WeekDay</Option>
                    <Option value={8}>AllWeek</Option>
                </Select>
                <Button style={{marginLeft: '10px'}} type="primary" onClick={submitDay}>Add</Button>
            </div>
        </div>
    );
};

export default MonthSection;
