import React from 'react';
import styles from './DeliveryTruck.module.scss';

const DeliveryTruck = () => (
  <React.Fragment>
    <div className={styles.header}>
      <span className={styles.text}>Delivery Truck</span>
    </div>
    <div className={styles.body}></div>
  </React.Fragment>
);

export default DeliveryTruck;
