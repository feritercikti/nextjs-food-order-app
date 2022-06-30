import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>THE BEST PIZZA</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ADDRESS</h1>
          <p className={styles.text}>
            0123 45 blv 475
            <br />
            City, 5646
            <br /> 012 235-456
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY-FRIDAY
            <br />
            9:00 - 23:00
          </p>
          <p className={styles.text}>
            SATURDAY-SUNDAY
            <br />
            11:00 - 22:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
