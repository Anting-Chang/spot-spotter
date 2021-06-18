import React, { useState, useEffect } from 'react';

import {DatePicker, Space, Button, Select, Alert, Input} from 'antd';
import {MONTH_MAP} from "../../../shared/util/DataMap";
import MonthSection from "./MonthSection";
import styles from './AddPointPanel.module.css'
const { Option } = Select
const { RangePicker } = DatePicker;

const AddPointPanel = (props) => {
    const [monthInfo, setMonthInfo] = useState({})
    const [monthArray, setMonthArray] = useState([])
    const [numSpots, setNumSpots] = useState(5)
    const [inputError, setInputError] = useState({ifInputError: false, message: ''})

    useEffect(() => {
        setMonthArray([])
    }, [props.sendSuccessful])

    const reset = () => {
        setMonthArray([])
        setMonthInfo(prev => {
            return {
                monthStart: prev.monthStart,
                monthEnd: prev.monthEnd,
                day: []
            }
        })
    }

    const changeMonth = (date, dateString) => {
        console.log('date String', dateString)
        let monthStart = dateString[0].split('-')[1] - 1
        let monthEnd = dateString[1].split('-')[1] - 1
        setMonthInfo({
            monthStart: monthStart,
            monthEnd: monthEnd,
            day: []
            })
    }

    const submitMonth = () => {
        setMonthArray((prev) => {
            let newArray = prev.concat(monthInfo);
            console.log(newArray)
            return newArray
        })
    }

    // from month section
    const submitedDay = (value, index) => {
        console.log('main section reached')
        setMonthArray(prev => {
            prev[index].day = value
            console.log('main section',prev)
            return prev
        })
    }

    const setNumSpot = (e) => {
        setNumSpots(e.target.value)
    }

    const submitObj = () => {
        let emptyFlag = false
        if (monthArray.length === 0) {
            return setInputError({ifInputError: true, message: 'Month range is empty!'})
        }
        monthArray.map(month => {
            if (month.day.length === 0) {
                emptyFlag = true
                setInputError({ifInputError: true, message: 'Day or time is empty!'})
            }
        })
        console.log(monthArray)
        if (emptyFlag) return

        if (numSpots > 0 && numSpots < 50 ) {
            setInputError({ifInputError: false, message: ''})
            reset()
            return props.onSubmitMonth(monthArray, numSpots)
        }
        setInputError({ifInputError: true, message: 'Number of Spots not valid!'})
    }

    return (
        <div className={styles.pageWrapper}>
            {props.point && <div>
                <div className={styles.positionWrapper}>
                    <div>lat: {props.point.lat}</div>
                    <div>lat: {props.point.lng}</div>
                </div>
                <div className={styles.addPointWrapper}>
                    {monthArray && monthArray.length > 0 && monthArray.map((month, monthIndex) => {
                        return (
                            <MonthSection key={monthIndex} month={month} index={monthIndex} onSubmitDay={submitedDay}/>
                        )
                    })}
                    <div style={{marginBottom: '10px'}}>
                        <RangePicker onChange={changeMonth} picker="month" bordered={false}/>
                        <Button type="primary" onClick={submitMonth}>Add</Button>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input addonBefore="Number of Spots" defaultValue="5" onChange={setNumSpot} />
                    </div>
                    <Button type="primary" onClick={submitObj} loading={props.loading} style={{marginRight: '10px'}}>Submit</Button>

                    <Button style={{marginBottom: '10px'}} type="dark" onClick={reset}>Reset</Button>
                    {props.error && <Alert message="Add spot failed" type="error"/>}
                    {props.sendSuccessful && <Alert message="Add spot success" type="success"/>}
                    {inputError.ifInputError && <Alert message={inputError.message} type="error"/>}
                </div>
            </div>}
        </div>
    );
};

export default AddPointPanel;
