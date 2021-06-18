import React, { useState, useContext } from 'react';
import { Alert } from 'antd';

import AddPointMap from "../components/AddPointMap";

import styles from './AddPoint.module.css'
import AddPointPanel from "../components/AddPointPanel";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const AddPoint = () => {
    const [point,setPoint] = useState(null)
    const [sendSuccessful, setSendSuccessful] = useState(false)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const auth = useContext(AuthContext)

    const choosePoint = (info) => {
        setPoint(info)
    }

    const submitMonth = (value) => {
        setPoint(prev => {
            prev.limit = value
            prev.numSpots = 5
            // console.log('main main section',prev)
            return prev
        })
        postPoint()
    }

    const postPoint = async() => {
        console.log('send post point',point)
        try {
            const responseData = await sendRequest('spot/postSpot', 'POST',
                JSON.stringify(point),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            if (!error) {
                setSendSuccessful(true)

                setTimeout(() => {
                    setPoint(null)
                    setSendSuccessful(false)
                }, 5000)
            }
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                clearError()
            },5000)
        }
    }

    return (
        <div className={styles.pageWrapper}>

            <AddPointMap onChoosePoint={choosePoint}/>
            {point == null && <div className={styles.noInfoWrapper}>
                <div className={styles.noInfoSection}>No point is choosen, please click on the map to choose a point</div>
            </div>}
            {point && <AddPointPanel point={point} error={error} sendSuccessful={sendSuccessful} loading={isLoading}
                            onSubmitMonth={submitMonth}/>}

        </div>
    );
};

export default AddPoint;
