import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import axios from 'axios';
import Edit from '../../components/Edit';

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ['preparing', 'on the way', 'delivered'];
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    file: '',
    title: '',
    desc: '',
    prices: [],
    extraOptions: [],
    extra: '',
  });

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        'http://localhost:3000/api/products/' + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const orderDelete = async (id) => {
    try {
      const res = await axios.delete('http://localhost:3000/api/orders/' + id);
      setOrderList(orderList.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if (currentStatus !== 2) {
      try {
        const res = await axios.put('http://localhost:3000/api/orders/' + id, {
          status: currentStatus + 1,
        });
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const productSize = (index) => {
    if (index === 0) return 'Small';
    if (index === 1) return 'Medium';
    if (index === 2) return 'Large';
  };

  const handleUpdate = (id) => {
    setEdit(true);
    const selectedProduct = products.find((product) => product._id === id);
    setProduct({
      file: selectedProduct.img,
      title: selectedProduct.title,
      desc: selectedProduct.desc,
      prices: selectedProduct.prices,
      extraOptions: selectedProduct.extraOptions,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Desc</th>
              <th>Prices</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>{product.desc.slice(0, 15)}</td>
                <td>
                  ${product.prices[0]}, ${product.prices[1]}, $
                  {product.prices[2]}
                </td>

                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleUpdate(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>OrderId</th>
              <th>Product</th>
              <th>Size</th>
              <th>Extras</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 10)}..</td>
                <td>{order.products.map((product) => `${product.title} `)}</td>
                <td>
                  {order.products.map(
                    (product) => `${productSize(product.size)} `
                  )}
                </td>
                <td>
                  {order.products.map((product) =>
                    product.extras.map((extra) => `${extra.text} `)
                  )}
                </td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>${order.total}</td>
                <td>cash</td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => orderDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {edit && (
        <Edit setEdit={setEdit} pizzaList={pizzaList} product={product} />
      )}
    </div>
  );
};

export const getServerSideProps = async (cntxt) => {
  const myCookie = cntxt.req?.cookies || '';

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  const productRes = await axios.get('http://localhost:3000/api/products');
  const orderRes = await axios.get('http://localhost:3000/api/orders');

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
