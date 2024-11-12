import { useEffect } from 'react';
import styles from './CartPage.module.scss';
import CartGoodTile from '../../components/cartGoodTile';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCartListItem,
  clearCartList,
  removeCartListItem,
  syncCartWithServer,
} from '../../redux/slices/cartSlice';

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice);
  const user = useSelector((state) => state.userSlice.user);

  const counterHandler = (action, item) => {
    if (action === 'add') {
      dispatch(addCartListItem(item));
    } else if (action === 'remove') {
      dispatch(removeCartListItem({ item: item, action: 'one' }));
    } else if (action === 'full') {
      dispatch(removeCartListItem({ item: item, action: 'full' }));
    }
  };

  const resSum = () => {
    let tmp = 0;
    cart.forEach((item) => {
      tmp += item.price * item.count;
    });
    return Math.round(tmp);
  };

  const clearCart = () => {
    dispatch(clearCartList());
  };

  useEffect(() => {
    if (user.token && (cart === user.cart)) {
      dispatch(syncCartWithServer());
    }
  }, [cart, user, dispatch]);

  return (
    <div className={styles.root}>
      {cart.length > 0 ? (
        <>
          <div>
            <div>
              <button onClick={clearCart}>
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
            {cart.map((item, index) => (
              <CartGoodTile
                item={item}
                key={item.sku + ' ' + index}
                counterHandler={counterHandler}
              />
            ))}
          </div>
          <div className={styles.sideBlock}>
            <div>
              <p>
                <span>{cart.length}</span> товар(а/ів) на суму
              </p>
              <span>{resSum()} ₴</span>
            </div>

            <button>Перейти до оформлення</button>
          </div>
        </>
      ) : (
        <p>
          Корзина ще пуста, але Ви можете це <Link to={'/'}>виправити</Link>!
        </p>
      )}
    </div>
  );
}

export default CartPage;
