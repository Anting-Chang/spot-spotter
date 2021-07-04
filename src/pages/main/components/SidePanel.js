import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'antd';
import {BsXCircleFill} from "react-icons/bs"
import {SiGithub, SiLinkedin, SiGmail} from "react-icons/si"

import styles from './SidePanel.module.css'

import Filter from "./Filter";
import { MONTH_MAP, DAY_MAP } from "../../../shared/util/DataMap";
import PointInfoCard from "./PointInfoCard";
import TripsCard from "./TripsCard";
import {AuthContext} from "../../../shared/context/auth-context";
import {useAuth} from "../../../shared/hooks/auth-hook";
import {useHttpClient} from "../../../shared/hooks/http-hook";

const SidePanel = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [successState, setSuccessState] = useState(0)
    const [showAds, setShowAds] = useState(true)
    const [trips, setTrips] = useState([])

    const filterList = (filterInfo) => {
        props.onFilter(filterInfo)
    }


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

    const addTrip = (info) => {
        for (let i = 0; i < trips.length; i++) {
            if (trips[i].id === info.id) return
        }
        if (trips.length >= 8) return;
        setTrips(prev => [...prev, info])
    }

    const resetTrips = () => {
        setTrips([])
    }

    const tripsGo = () => {
        let googleUrl = 'https://www.google.com/maps/dir//'
        for (let i = 0; i < trips.length; i++) {
            googleUrl = `${googleUrl}${trips[i].lat},${trips[i].lng}/`
        }
        window.location.href = googleUrl;
    }

    return (
        <div className={styles.pageWrapper}>
            {showAds && <div className={styles.advertisementWrapper}>
                <div className={styles.advertisementIcon}>
                    < a href="https://github.com/Anting-Chang/spot-spotter" target="_blank" rel="noopener noreferrer">
                        <SiGithub style={{color: '#ff6363',fontSize: '2rem', marginRight: '10px'}}/>
                    < /a>
                    < a href="https://www.linkedin.com/in/chang-anting-87a619a5/" target="_blank" rel="noopener noreferrer">
                        <SiLinkedin style={{color: '#ff6363',fontSize: '2rem', marginRight: '10px'}}/>
                    </a>
                    < a href="mailto:antingchang@yahoo.ca" target="_blank" rel="noopener noreferrer">
                        <SiGmail style={{color: '#ff6363',fontSize: '2rem'}}/>
                    </a>
                </div>
                <div className={styles.advertisement}>
                    <a href="https://www.linkedin.com/in/chang-anting-87a619a5/" style={{textDecoration: 'underline'}}>
                        Anting is looking for a Front End Dev Job. Star on Github if you like it.
                    </a>
                    <div onClick={() => setShowAds(false)}><BsXCircleFill style={{color: '#999'}}/></div>
                </div >
            </div>}
            <Filter onFilter={filterList} onReset={() => props.onReset()}/>
            {trips.length > 0 && <TripsCard trips={trips} onTripsGo={tripsGo} onResetTrips={resetTrips}/>}
            {props.info !== null && <PointInfoCard loading={isLoading} info={props.info} userId={auth.userId} onAddTrip={addTrip} onDeleteSpot={deleteSpot} />}
            {successState===1 && <Alert style={{marginTop: '10px'}} message="Successfully Deleted" type="success"/>}
            {successState===2 && <Alert style={{marginTop: '10px'}} message="Delete failed" type="danger"/>}
        </div>
    );
};

export default SidePanel;
