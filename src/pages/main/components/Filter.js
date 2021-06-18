import React, { useState } from 'react';

import { Input, Select, Button } from 'antd';

import styles from './Filter.module.css'
const { Option } = Select;

const Filter = (props) => {
    const [day, setDay] = useState(1)
    const [startHour, setStartHour] = useState(1)
    const [endHour, setEndHour] = useState(23)


    const filter = () => {
        props.onFilter({
            day,
            startHour,
            endHour
        })
    }

    const changeDay = (value) => {
        setDay(value)
    }

    const changeStartHour = (value) => {
        setStartHour(value)
    }

    const changeEndHour = (value) => {
        setEndHour(value)
    }

    return (
        <div className={styles.filterWrapper}>
            <div className={styles.title}>Time Filter</div>
            <div className={styles.inputsWrapper}>
                <Input.Group compact>
                    <Select onChange={changeDay} defaultValue={1}>
                        <Option value={1}>Mon</Option>
                        <Option value={2}>Tue</Option>
                        <Option value={3}>Wed</Option>
                        <Option value={4}>Thu</Option>
                        <Option value={5}>Fri</Option>
                        <Option value={6}>Sat</Option>
                        <Option value={0}>Sun</Option>
                    </Select>
                    <Select onChange={changeStartHour} defaultValue={1} style={{marginLeft: '10px'}} >
                        {Array(24).fill(1).map((el, i) =>
                            <Option key={i} value={i}>{i}:00</Option>
                        )}
                    </Select>
                    <Input
                        className="site-input-split"
                        style={{
                            width: 30,
                            borderLeft: 0,
                            borderRight: 0,
                            pointerEvents: 'none',
                        }}
                        placeholder="~"
                        disabled
                    />
                    <Select onChange={changeEndHour} defaultValue={23}>
                        {Array(24).fill(1).map((el, i) =>
                            <Option key={i} value={i}>{i}:00</Option>
                        )}
                    </Select>
                </Input.Group>
                <Button type="primary" onClick={filter} style={{marginRight: '10px'}}>Filter</Button>
                <Button type="dark" onClick={props.onReset}>Reset</Button>
            </div>
        </div>
    );
};

export default Filter;
