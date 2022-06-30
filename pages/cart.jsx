import React from 'react';
import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import axios from 'axios';
import OrderDetail from '../components/OrderDetail';

const Cart = () => {
  const [open, setOpen] = useState(false);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const router = useRouter();

  const productSize = (index) => {
    if (index === 0) return 'Small';
    if (index === 1) return 'Medium';
    if (index === 2) return 'Large';
  };

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Size</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>

          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout='fill'
                      alt=''
                      objectFit='cover'
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.name}>
                    {productSize(product.size)}
                  </span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{`${extra.text} `} </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.quantity * product.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$ {cart.total}
          </div>
          <button className={styles.button} onClick={() => setOpen(true)}>
            CHECKOUT NOW!
          </button>
          <button className={styles.cancel} onClick={() => dispatch(reset())}>
            CANCEL
          </button>
        </div>
      </div>
      {open && (
        <OrderDetail
          total={cart.total}
          createOrder={createOrder}
          setOpen={setOpen}
          productSize={productSize}
        />
      )}
    </div>
  );
};

export default Cart;
