import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux/';
import Link from 'next/link';

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/img/telephone.png' alt='' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.texts}>Order Now</div>
          <div className={styles.texts}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref>
            <li className={styles.listItem} style={{ cursor: 'pointer ' }}>
              Home
            </li>
          </Link>
          <li className={styles.listItem}>Products</li>

          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href='/cart' passHref>
        <div className={styles.item}>
          <div className={styles.cart} style={{ cursor: 'pointer' }}>
            <Image
              src={'/img/cart.png'}
              alt='logo'
              width='30px'
              height='30px'
            />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
