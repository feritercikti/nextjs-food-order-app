import React from 'react';
import styles from '../styles/Add.module.css';
import { useRouter } from 'next/router';

const AddButton = ({ setClose }) => {
  const router = useRouter();

  return (
    <div className={styles.addButtonContainer}>
      <div onClick={() => setClose(false)} className={styles.mainAddButton}>
        Add New Pizza
      </div>
      <div
        onClick={() => router.push('/admin')}
        className={styles.mainAddButton}
      >
        Dashboard
      </div>
    </div>
  );
};

export default AddButton;
