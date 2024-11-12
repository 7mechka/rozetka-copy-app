import { Link } from 'react-router-dom';
import styles from './GoodsCard.module.scss';

function GoodsTile({ name, tileImageURL, isAvailable, price, sku }) {
  return (
    <div className={styles.root}>
      <Link to={'/goods/'+sku}>
        <img
          src={tileImageURL}
          alt={sku}
        />
      </Link>
      <div>
        <Link to={'/goods/'+sku}>
          <p>{name}</p>
          <p>{isAvailable ? 'В наявності' : 'Не в наявності'}</p>
          <p>{price} грн</p>
        </Link>
      </div>
    </div>
  );
}

export default GoodsTile;
