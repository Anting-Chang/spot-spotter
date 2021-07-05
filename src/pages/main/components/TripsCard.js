import React from 'react';
import styles from "./TripsCard.module.css";
import {BsFillCursorFill, BsPlusCircleFill} from "react-icons/bs";

const TripsCard = (props) => {

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.tripsWrapper}>
                <div className={styles.pointsWrapper}>
                    {props.trips.length > 0 && props.trips.map((info, index) => {
                        return (
                            <div className={styles.points} key={info.id}></div>
                        )
                    })}
                </div>
                <div className={styles.btnWrapper}>
                    <div className={styles.BtnReset} onClick={() => props.onResetTrips()}>
                        <div>Reset</div>
                    </div>
                    <div className={styles.BtnDirection} onClick={() => props.onTripsGo()}>
                        <BsFillCursorFill style={{fontSize: '1rem'}}/>
                        <div>&nbsp;GO</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TripsCard;