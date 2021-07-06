import React, {useEffect, useState, useRef} from 'react';
import { Button } from 'antd';
import {
    BsFillCaretUpFill,
    BsFillCaretDownFill,
    BsFillCursorFill,
    BsPlusCircleFill,
    BsFillSlashCircleFill,
    BsGiftFill
} from "react-icons/bs"

import styles from './PointInfoCard.module.css'
import DetailLimitInfo from "./info-components/DetailLimitInfo";
import SimpleLimitInfo from "./info-components/SimpleLimitInfo";
import ExpandBtn from "../../../shared/components/ExpandBtn/ExpandBtn";
import MainBtn from "../../../shared/components/Buttons/MainBtn";

import {DAY_MAP, MONTH_MAP} from "../../../shared/util/DataMap";

const PointInfoCard = (props) => {
    const [isDetailInfo, setIsDetailInfo] = useState(false)
    const [boxHeight, setBoxHeight] = useState(0)

    const detailInfoRef = useRef()
    const simpleInfoRef = useRef()

    useEffect(() => {
        setTimeout(()=> {
            if (isDetailInfo) {
                setBoxHeight(detailInfoRef.current.scrollHeight)
            } else {
                setBoxHeight(simpleInfoRef.current.scrollHeight)
            }
        }, 0)
    }, [isDetailInfo,props.info])

    const addTrip = () => {
        props.onAddTrip(props.info)
    }

    return (
        <div className={styles.infoCardWrapper} >
            <div className={styles.infoCard} style={{height: boxHeight}}>
                {isDetailInfo && <div ref={detailInfoRef}
                      style={isDetailInfo ? {opacity: '1'} : {opacity: '0'}}
                      className={styles.infoTransition}>
                    <DetailLimitInfo {...props} onDeleteSpot={() => props.onDeleteSpot()} onAddTrip={addTrip}/>
                    {/*<div className={styles.simpleExpand} onClick={() => setIsDetailInfo(prev => !prev)}>*/}
                    {/*    <BsFillCaretUpFill />*/}
                    {/*</div>*/}
                </div>}
                {!isDetailInfo && <div ref={simpleInfoRef}
                      style={isDetailInfo ? {opacity: 0} : {opacity: 1}}
                      className={styles.infoTransition}>

                    <SimpleLimitInfo {...props}/>
                    <div className={styles.BtnWrapper}>
                        <a href={`http://maps.google.com/?q=${props.info.lat},${props.info.lng}`}>
                            <MainBtn solid={true}>
                                <BsFillCursorFill style={{fontSize: '1rem'}}/>
                                <div>&nbsp;Direction</div>
                            </MainBtn>
                        </a>
                        <MainBtn style={{marginLeft: '10px'}}  solid={false} onBtnClick={addTrip}>
                            <BsPlusCircleFill style={{fontSize: '1rem'}}/>
                            <div>&nbsp;Add To Trip</div>
                        </MainBtn>
                    </div>
                </div>}
            </div>
            <ExpandBtn isDown={!isDetailInfo} onBtnClick={() => setIsDetailInfo(prev => !prev)}/>
        </div>

    );
};

export default PointInfoCard;
