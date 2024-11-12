import { Link } from 'react-router-dom';
import styles from './CartGoodTile.module.scss';

function CartGoodTile({ item, counterHandler }) {
  return (
    <div className={styles.root}>
      <div className={styles.imgBlock}>
        <Link to={`/goods/${item.sku}`}>
          <img
            src={item.imgUrl}
            alt=''
          />
        </Link>
      </div>
      <div className={styles.mainBlock}>
        <div className={styles.topContent}>
          <div>
            <Link to={`/goods/${item.sku}`}>{item.name}</Link>
            <p>Код товару: {item.sku}</p>
          </div>
          <span>{item.price} ₴</span>
        </div>
        <div className={styles.bottomContent}>
          <div>
            <button onClick={() => counterHandler('full', item)}>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 -960 960 960'
                  width='24px'
                  fill='#5f6368'>
                  <path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z' />
                </svg>
              </span>
              Видалити
            </button>
          </div>
          <div className={styles.counter}>
            <button onClick={() => counterHandler('remove', item)}>
              <span>-</span>
            </button>
            <span>{item.count}</span>
            <button onClick={() => counterHandler('add', item)}>
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartGoodTile;
