import React, { useState } from 'react';
import styles from '../styles/Edit.module.css';
import axios from 'axios';

const Edit = ({ setEdit, pizzaList, product }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dm9geca0d/image/upload',
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.put('http://localhost:3000/api/products', newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setEdit(false)} className={styles.close}>
          X
        </span>
        <h1>Edit Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}> Choose an image</label>
          <input
            type='file'
            value={product.img}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}> Title</label>
          <input
            className={styles.input}
            type='text'
            value={product.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type='text'
            value={product.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Small'
              value={product.prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Medium'
              value={product.prices[1]}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Large'
              value={product.prices[2]}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='text'
              placeholder='Item'
              name='text'
              value={product.extraOptions.map((extra) => extra.text)}
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Price'
              name='price'
              value={product.extraOptions.map((extra) => extra.price)}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;
