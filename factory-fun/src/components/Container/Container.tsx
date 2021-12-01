import React from 'react';
import Orders from '../Orders/Orders';
import StationOne from '../StationOne/StationOne';
import StationTwo from '../StationTwo/StationTwo';
import StationThree from '../StationThree/StationThree';
import DeliveryTruck from '../DeliveryTruck/DeliveryTruck';
import styles from './Container.module.css';

const Container = () => (
  <div className={styles.container}>
    <div className={styles.itemorders}>
      <Orders />
    </div>
    <div className={styles.itemstationone}>
      <StationOne />
    </div>
    <div className={styles.itemstationtwo}>
      <StationTwo />
    </div>
    <div className={styles.itemstationthree}>
      <StationThree />
    </div>
    <div className={styles.itemdeliverytruck}>
      <DeliveryTruck />
    </div>
  </div>
);

export default Container;
