import React, { useState } from 'react';

import { Input, Select, Button } from 'antd';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"

import styles from './Filter.module.css'
const { Option } = Select;

const Filter = (props) => {
    const [day, setDay] = useState(1)
    const [startHour, setStartHour] = useState(1)
    const [endHour, setEndHour] = useState(23)
    const [showExp, setShowExp] = useState(false)
    const [ifDetailFilter, setIfDetailFilter] = useState(false)

    const [filterHour, setFilterHour] = useState(1)


    const filter = () => {
        console.log(day,startHour,endHour)
        props.onFilter({
            day,
            startHour,
            endHour
        })
    }

    const simpleFilter = () => {
        props.onReset()
        const currentDate = new Date()
        const simpleDay = currentDate.getDay()
        const simpleStartHour = currentDate.getHours()
        const simpleEndHour = currentDate.getHours() + filterHour
        console.log(simpleDay,simpleStartHour,simpleEndHour)
        props.onFilter({
            day: simpleDay,
            startHour: simpleStartHour,
            endHour: simpleEndHour
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
            {ifDetailFilter && <div className={styles.title} onClick={() => setShowExp(prev => !prev)}>Paradoxical Time Filter</div>}
            {showExp && <div>
                This filter is special. You need to enter your upper and lower limit time of arrival.(If you can arrive at Monday between 5pm and 6pm, then enter Mon,5pm,6pm)
                It is going to filter all the spots that just become available in this time range.
                If a spot has 'No parking' before 6pm, then if you arrive at 5:45pm, you will be guaranteed a spot, just
                wait until 6pm and leave.(unless its really downtown, people park there even they are going to get a
                ticket)
                It's paradoxical because it filters when the spot is unusable rather than when its usable.
            </div>}
            {!ifDetailFilter &&
                <div>
                    <div className={styles.simpleFilterWrapper}>
                        <div className={styles.simpleFilter}>
                            <div className={styles.simpleFilterPlusMinus} onClick={() => setFilterHour(num => num-1)}>-</div>
                            <div className={styles.simpleFilterMiddle} onClick={simpleFilter}>Next {filterHour} Hour</div>
                            <div className={styles.simpleFilterPlusMinus} onClick={() => setFilterHour(num => num+1)}>+</div>
                        </div>
                        <div className={styles.simpleReset} onClick={props.onReset}>Reset</div>
                    </div>
                    <div className={styles.simpleExpand} onClick={() => setIfDetailFilter(prev => !prev)}>
                        <BsFillCaretDownFill />
                    </div>
                </div>
                }
            {ifDetailFilter && <div className={styles.inputsWrapper}>
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
                    <Select onChange={changeStartHour} defaultValue={1} style={{marginLeft: '10px'}}>
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
                <div className={styles.btnWrapper}>
                    <Button type="primary" onClick={filter} style={{marginRight: '10px'}}>Filter</Button>
                    <Button type="dark" onClick={props.onReset}>Reset</Button>
                </div>
                <div className={styles.simpleExpand} onClick={() => setIfDetailFilter(prev => !prev)}>
                    <BsFillCaretUpFill />
                </div>

            </div>}
        </div>
    );
};

export default Filter;
