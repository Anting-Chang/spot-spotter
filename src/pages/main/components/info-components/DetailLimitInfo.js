import React from 'react';
import styles from "./DetailLimitInfo.module.css";
import {DAY_MAP, MONTH_MAP, FULL_DAY_MAP, RULE_MAP} from "../../../../shared/util/DataMap";
import {BsFillCursorFill, BsFillSlashCircleFill, BsPlusCircleFill} from "react-icons/bs";
import {BiCar, BiPencil, BiCurrentLocation, BiCopy} from "react-icons/bi";
import {Button} from "antd";
import MainBtn from "../../../../shared/components/Buttons/MainBtn";

const DetailLimitInfo = (props) => {
    const copyPosition = () => {
        navigator.clipboard.writeText(
            `${props.info.lat.substring(0, 8)},${props.info.lng.substring(0, 9)}`
        )
    }

    return (
        <div>
            {props.info.limit && props.info.limit.map((month, index) => {
                return (
                    <div key={index}>
                        <div className={styles.monthWrapper}>
                            <div className={styles.iconSection}>
                                <BsFillSlashCircleFill style={{color: 'red', fontSize: '0.9rem'}}/>
                            </div>
                            {month.monthStart === month.monthEnd && <div>All Year</div>}
                            {month.monthStart !== month.monthEnd && <div>
                                {MONTH_MAP[month.monthStart]} to {MONTH_MAP[month.monthEnd]}
                            </div>}
                        </div>
                        {month.day.map((day, index) => {
                            return (
                                <div key={index} className={styles.dayWrapper}>
                                    <div className={styles.iconSection}></div>
                                    <div className={styles.daySection}>
                                        <div className={styles.dayTitle}>{FULL_DAY_MAP[day.num]}</div>
                                        <div className={styles.timeStyle}>
                                            {day.time.map((time, index) => {
                                                return (
                                                    <div key={index}>{`${time.rule > 0 ? (`${RULE_MAP[time.rule]} • `) : ''}${time.startHour}:${time.startMinute} to ${time.endHour}:${time.endMinute}`}</div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) }
                        <div className={styles.spliter}/>
                    </div>
                )
            })}
            <div className={styles.spotsWrapper}>
                <div className={styles.iconSection}>
                    <BiCar style={{color: 'rgb(2, 169, 230)', fontSize: '1.2rem'}}/>
                </div>
                <div>{props.info.numSpots}&nbsp;spots</div>
            </div>
            <div className={styles.spliter}/>
            <div className={styles.descriptionWrapper}>
                <div className={styles.iconSection}>
                    <BiPencil style={{color: 'rgb(2, 169, 230)', fontSize: '1.2rem'}}/>
                </div>
                <div style={{wordWrap: 'break-word'}}>{props.info.description ? props.info.description : 'No description'}</div>
            </div>
            <div className={styles.spliter}/>
            <div className={styles.positionWrapper}>
                <div className={styles.iconSection}>
                    <BiCurrentLocation style={{color: 'rgb(2, 169, 230)', fontSize: '1.2rem'}}/>
                </div>
                <div className={styles.positionSection}>
                    <div>{props.info.lat.substring(0, 8)},{props.info.lng.substring(0, 9)}</div>
                    <MainBtn style={{borderColor: '#999'}} solid={false} small={true} onBtnClick={copyPosition}>
                        <BiCopy style={{fontSize: '0.8rem', color: '#999'}}/>
                        <div style={{color: '#999'}}>&nbsp;Copy</div>
                    </MainBtn>
                </div>
            </div>
            {props.info.creator === props.userId && <div className={styles.positionWrapper}>
                <Button type="primary" danger onClick={() => props.onDeleteSpot()}>
                    Delete
                </Button>
            </div>}
            <div className={styles.spliter}/>
            <div className={styles.BtnWrapper}>
                <a href={`http://maps.google.com/?q=${props.info.lat},${props.info.lng}`}>
                    <MainBtn solid={true}>
                        <BsFillCursorFill style={{fontSize: '1rem'}}/>
                        <div >&nbsp;Direction</div>
                    </MainBtn>
                </a>
                <MainBtn style={{marginLeft: '10px'}}  solid={false} onBtnClick={() => props.onAddTrip()}>
                    <BsPlusCircleFill style={{fontSize: '1rem'}}/>
                    <div>&nbsp;Add To Trip</div>
                </MainBtn>
            </div>
        </div>
    );
};

export default DetailLimitInfo;