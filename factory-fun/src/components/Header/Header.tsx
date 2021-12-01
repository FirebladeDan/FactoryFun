import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.header}>
    <span className={styles.text}>FactoryFun</span>
  </div>
);

export default Header;
