import React, {useEffect, useRef, useState} from 'react';

import { Input, Select, Button } from 'antd';
import { BsFillCaretDownFill, BsFillCaretUpFill, BsPlus, BsDash } from "react-icons/bs"

import ExpandBtn from "../../../shared/components/ExpandBtn/ExpandBtn";

import styles from './Filter.module.css'
const { Option } = Select;

const Filter = (props) => {
    const [day, setDay] = useState(1)
    const [startHour, setStartHour] = useState(1)
    const [endHour, setEndHour] = useState(23)
    const [showExp, setShowExp] = useState(false)
    const [ifDetailFilter, setIfDetailFilter] = useState(false)
    const [boxHeight, setBoxHeight] = useState(0)

    const [filterHour, setFilterHour] = useState(1)

    const detailFilterRef = useRef()
    const simpleFilterRef = useRef()

    useEffect(() => {
        setTimeout(()=> {
            if (ifDetailFilter) {
                setBoxHeight(detailFilterRef.current.scrollHeight)
            } else {
                setBoxHeight(simpleFilterRef.current.scrollHeight)
            }
        }, 0)
    }, [ifDetailFilter])

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
            <div className={styles.filterCard} style={{height: boxHeight}}>
                {!ifDetailFilter &&
                <div ref={simpleFilterRef} >
                    <div className={styles.simpleFilterWrapper}>
                        <div className={styles.simpleFilter}>
                            <div className={styles.simpleFilterPlusMinus} onClick={() => setFilterHour(num => num-1)}><BsDash/></div>
                            <div className={styles.simpleFilterMiddle} onClick={simpleFilter}>Filter Next {filterHour}h</div>
                            <div className={styles.simpleFilterPlusMinus} onClick={() => setFilterHour(num => num+1)}><BsPlus/></div>
                        </div>
                        <div className={styles.simpleReset} onClick={props.onReset}>Reset</div>
                    </div>
                    <div style={{fontSize: '0.6rem',color: '#999'}}>Only filters spots that is BECOMING available within next {filterHour} hr</div>
                    {/*<div className={styles.simpleExpand} onClick={() => setIfDetailFilter(prev => !prev)}>*/}
                    {/*    <BsFillCaretDownFill />*/}
                    {/*</div>*/}
                </div>
                }
                {ifDetailFilter &&
                <div className={styles.inputsWrapper} ref={detailFilterRef}>
                    <div className={styles.title}>Paradoxical Time Filter</div>
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
            <ExpandBtn isDown={!ifDetailFilter} onBtnClick={() => setIfDetailFilter(prev => !prev)}/>

        </div>
    );
};

export default Filter;
