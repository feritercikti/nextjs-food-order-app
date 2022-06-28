import React from 'react';
import styles from '../styles/OrderDetail.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const OrderDetail = ({ total, createOrder, setOpen }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const cart = useSelector((state) => state.cart);

  const handleClick = () => {
    createOrder({
      customer,
      address,
      phone,
      total,
      method: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          You will pay ${cart.total} after delivery
        </h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder='John Doe'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            placeholder='+1 234 567 89'
            type='text'
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder='Address'
            type='text'
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Product</label>

          {cart.products.map((product) => (
            <div key={product._id}>
              <span className={styles.name}>{product.title} </span>
            </div>
          ))}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extras</label>
          {cart.products.map((product) => (
            <div key={product._id}>
              <span className={styles.extras}>
                {product.extras.map((extra) => (
                  <span key={extra._id}>{extra.text} </span>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => handleClick()}>
            Order
          </button>
          <button onClick={() => setOpen(false)} className={styles.closebutton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
