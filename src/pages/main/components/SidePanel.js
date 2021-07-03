import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'antd';

import styles from './SidePanel.module.css'

import Filter from "./Filter";
import { MONTH_MAP, DAY_MAP } from "../../../shared/util/DataMap";
import PointInfoCard from "./PointInfoCard";
import {AuthContext} from "../../../shared/context/auth-context";
import {useAuth} from "../../../shared/hooks/auth-hook";
import {useHttpClient} from "../../../shared/hooks/http-hook";

const SidePanel = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [successState, setSuccessState] = useState(0)
    const [showAds, setShowAds] = useState(true)

    const filterList = (filterInfo) => {
        props.onFilter(filterInfo)
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAds(false)
        },8000)
    }, [])

    const deleteSpot = async() => {
        // console.log(props.info)
        try {
            const responseData = await sendRequest(
                `spot/deleteSpot/${props.info.id}`,
                'DELETE', {}, {Authorization: 'Bearer ' + auth.token})
            console.log(responseData)
            if (!error) {
                setSuccessState(1)
                setTimeout(() => {
                    setSuccessState(0)
                }, 5000)
                props.onDeleteSpot(props.info.id)
            }
        } catch (e) {
            setSuccessState(2)
            setTimeout(() => {
                setSuccessState(0)
            }, 5000)
        }
    }

    return (
        <div className={styles.pageWrapper}>
            {showAds && <div className={styles.advertisement}>
                <a href="https://www.linkedin.com/in/chang-anting-87a619a5/" style={{textDecoration: 'underline'}}>
                    Anting is looking for a Front End Dev Job
                </a>
            </div>}
            <Filter onFilter={filterList} onReset={() => props.onReset()}/>
            {props.info !== null && <div>
                <PointInfoCard loading={isLoading} info={props.info} userId={auth.userId} onDeleteSpot={deleteSpot} />
            </div>}
            {successState===1 && <Alert style={{marginTop: '10px'}} message="Successfully Deleted" type="success"/>}
            {successState===2 && <Alert style={{marginTop: '10px'}} message="Delete failed" type="danger"/>}
        </div>
    );
};

export default SidePanel;
