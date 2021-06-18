import React from 'react';

import styles from './Point.module.css'

const Point = () => {
    return (
        <div>
            <div className={`${styles.pin} ${styles.bounce}`}></div>
            <div className={styles.pulse}></div>
        </div>
    );
};

export default Point;
