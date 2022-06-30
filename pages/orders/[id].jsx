import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Order.module.css';
import axios from 'axios';

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.notdone;
  };

  const productSize = (size) => {
    if (size === 0) return 'Small';
    if (size === 1) return 'Medium';
    if (size === 2) return 'Large';
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Product</th>
                <th>Size</th>
                <th>Extras</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
                <th>Payment Status</th>
              </tr>
            </tbody>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.id}>
                    {order.products.map((product) => product.title)}
                  </span>
                </td>
                <td>
                  <span className={styles.id}>
                    {order.products.map((product) => productSize(product.size))}
                  </span>
                </td>

                <td>
                  <span className={styles.id}>
                    {order.products.map((product) =>
                      product.extras.map((extra) => extra.text)
                    )}
                  </span>
                </td>
                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address} </span>
                </td>
                <td>
                  <span className={styles.total}>${order.total}</span>
                </td>
                <td>
                  <span className={styles.total}>Not Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src='/img/paid.png' width={50} height={50} alt='' />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src='/img/bake.png' width={50} height={50} alt='' />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src='/img/bike.png' width={50} height={50} alt='' />
            <span>On the Way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src='/img/delivered.png' width={50} height={50} alt='' />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;
