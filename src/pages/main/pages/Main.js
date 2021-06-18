import React, { useState, useEffect } from 'react';
import Map from "../components/Map";
import SidePanel from "../components/SidePanel";
import { pointsList } from "../../../shared/util/Points";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import styles from './Main.module.css'

const Main = () => {
    const [info, setInfo] = useState(null)
    const [filteredPointsList, setFilteredPointsList] = useState(null)
    const [originPointsList, setOriginPointsList] = useState(null)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const sendPointsReq = async() => {
            try {
                const responseData = await sendRequest('spot/getAllSpots')
                // console.log(responseData)
                setFilteredPointsList(responseData.spot)
                setOriginPointsList(responseData.spot)
            } catch (e) {}
        }
        sendPointsReq()
    }, [])

    const clickIcon = (info) => {
        setInfo(info)
        console.log(info)
    }

    useEffect(() => {
        console.log(filteredPointsList)
    }, [filteredPointsList])

    const filterList = (filterInfo) => {
        const dayFilter = filterInfo.day
        let includeWeekDay;
        if (filterInfo.day <= 5 && filterInfo.day > 0) {
            includeWeekDay = 7
        } else {
            includeWeekDay = -1
        }
        const timeStartFilter = filterInfo.startHour
        const timeEndFilter = filterInfo.endHour
        console.log('reached filterList')
        // console.log(filteredPointsList)
        setFilteredPointsList((unFilteredList) => {
            console.log('reached')
            let filteredList = new Array()
            let flag = false
            originPointsList.map(item => {
                item.limit.map(month => {
                    month.day.map(day => {
                        console.log(day)
                        if (day.num == dayFilter || day.num == 8 || day.num == includeWeekDay) {
                            day.time.map(time => {
                                console.log(time.startHour, time.endHour)
                                if (time.startHour > timeStartFilter && time.endHour < timeEndFilter) {
                                    flag = true
                                }
                            })
                        }
                    })
                })
                console.log('items here',item)
                if (flag) filteredList.push(item)
                flag = false
            })
            console.log(filteredList)
            return filteredList
        })
    }

    const deleteSpot = (sid) => {
        console.log('deleteSpot',sid)
        let newArray = originPointsList.filter(point => {
            if (sid == point.id) {
                return false
            }
            return true
        })
        console.log('newArray',newArray)
        setOriginPointsList(newArray)
        setFilteredPointsList(newArray)
    }

    const resetFilter = () => {
        setFilteredPointsList(originPointsList)
    }

    return (
        <div className={styles.pageWrapper}>
            <Map onClickIcon={clickIcon} pointsList={filteredPointsList}/>
            <SidePanel info={info} onFilter={filterList} onReset={resetFilter} onDeleteSpot={deleteSpot}/>
        </div>
    );
};

export default Main;
