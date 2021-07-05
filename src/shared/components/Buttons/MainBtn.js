import React from 'react';
import styles from "./MainBtn.module.css";
import {BsFillCursorFill} from "react-icons/bs";

/**
 * solid(true / false)
 * small(true / false)
 * link(string)
 * onBtnClick()
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainBtn = (props) => {
    return (
        <div style={props.style} onClick={() => props.onBtnClick()} className={
            `
            ${styles.btnBase} 
            ${props.solid ? (`${styles.btnSolid}`) : (`${styles.btnEmpty}`)}
            ${props.small ? (`${styles.btnSmall}`) : (`${styles.btnBig}`)}`}
        >
            {props.children}
        </div>
    );
};

export default MainBtn;