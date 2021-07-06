import React, {useEffect,useState} from 'react';
import {DAY_MAP, MONTH_MAP, RULE_MAP} from "../../../shared/util/DataMap";
import {Button, Select, TimePicker} from "antd";

import styles from './DaySection.module.css'
const { Option } = Select

const DaySection = (props) => {
    const [showAdd, setShowAdd] = useState(true)
    const [startTime, setStartTime] = useState({})
    const [endTime, setEndTime] = useState({})
    const [selectRule, setSelectRule] = useState(0)
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

    const changeRule = (ruleNum) => {
        setSelectRule(ruleNum)
    }

    const submitTime = () => {
        setTimeArray(prev => {
            let newArray = prev.concat({
                ...startTime,
                ...endTime,
                rule: selectRule
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
                        <div>{time.startHour}:{time.startMinute} to {time.endHour}:{time.endMinute} / {RULE_MAP[time.rule]}</div>
                    </div>
                )
            })}
            {showAdd && <div>
                <TimePicker onChange={changeStartTime}/>
                <TimePicker onChange={changeEndTime}/>
                <Select onChange={changeRule} defaultValue={0}>
                    <Option value={0}>{RULE_MAP[0]}</Option>
                    <Option value={1}>{RULE_MAP[1]}</Option>
                    <Option value={2}>{RULE_MAP[2]}</Option>
                    <Option value={3}>{RULE_MAP[3]}</Option>
                    <Option value={4}>{RULE_MAP[4]}</Option>
                    <Option value={5}>{RULE_MAP[5]}</Option>
                    <Option value={6}>{RULE_MAP[6]}</Option>
                </Select>
                <Button style={{marginLeft: '10px'}} type="primary" onClick={submitTime}>Add</Button>
            </div>}
        </div>
    );
};

export default DaySection;
