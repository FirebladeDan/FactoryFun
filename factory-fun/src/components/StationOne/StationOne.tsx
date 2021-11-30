import React from 'react';
import styles from './StationOne.module.scss';


const StationOne = () => (
  <React.Fragment>
    <div className={styles.header}>
      <span className={styles.text}>Station 1</span>
    </div>
    <div className={styles.body}></div>
  </React.Fragment>
);

export default StationOne;
