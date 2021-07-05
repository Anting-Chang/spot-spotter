import React from 'react';
import styles from "./ExpandBtn.module.css";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";

/**
 * isDown
 * onBtnClick
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ExpandBtn = (props) => {
    return (
        <div className={styles.simpleExpand} onClick={() => props.onBtnClick()}>
            {props.isDown && <BsFillCaretDownFill/>}
            {!props.isDown && <BsFillCaretUpFill/>}
        </div>
    );
};

export default ExpandBtn;