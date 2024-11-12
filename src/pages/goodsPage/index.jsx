import { useParams } from 'react-router';
import styles from './GoodsPage.module.scss';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import GoodsTile from '../../components/goodsTile';
import { useDispatch, useSelector } from 'react-redux';
import { addCartListItem } from '../../redux/slices/cartSlice';

function GoodsPage() {
  const { sku } = useParams();
  const [goods, setGoods] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);
  const [optionsState, setOptionsState] = useState({});
  const [isCartHaveThisGoods, setIsCartHaveThisGoods] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.userSlice);
  const cart = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();

  const optionsValueList = {
    color: 'Колір',
    storage: "Пам'ять",
    strapMaterial: 'Матеріал',
    screenSize: 'Розмір екрану',
    speedSettings: 'Налаштування швидкості',
    capacity: "Об'єм",
    sliceCapacity: 'Ємкість слайсів',
    cupCapacity: 'Ємкість чашок',
    power: 'Потужність',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setOptionsState({});
    axios
      .get('https://express-hello-world-vc7k.onrender.com/data/item/sku', { params: { sku: sku } })
      .then((res) => {
        const data = res.data;
        setGoods(data);

        const defaultOptions = {};
        Object.keys(data.options).forEach((key) => {
          defaultOptions[key] = data.options[key][0]; // Первое значение в массиве
        });
        setOptionsState(defaultOptions);

        console.log(data.tags)

        axios
          .get(
            'https://express-hello-world-vc7k.onrender.com/data/items/similar',
            {
              params: { tag: data.tags.join(','), category: data.category },
            }
          )
          .then((res) => {
            setSimilarProducts(
              res.data.filter((item) => item.sku !== data.sku)
            );
          });
      });
  }, [sku]);

  useEffect(() => {
    if (goods) {
      setIsCartHaveThisGoods(false);

      const existingItem = cart.find((item) => item.sku === goods.sku);

      if (existingItem) setIsCartHaveThisGoods(true);
    }
  }, [goods, cart]);

  const handleClick = (key, value) => {
    setOptionsState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const cartListHandler = () => {
    const cartItem = { ...goods, options: optionsState };

    let localCart = JSON.parse(localStorage.getItem('cartList'));

    if (!localCart) {
      localCart = [
        {
          sku: cartItem.sku,
          imgUrl: cartItem.tileImageURL,
          name: cartItem.name,
          price: cartItem.price,
          count: 1,
        },
      ];
    } else {
      const existingItem = localCart.find((item) => item.sku === cartItem.sku);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        localCart.push({
          // sku: cartItem.sku,
          // count: 1,
          sku: cartItem.sku,
          imgUrl: cartItem.tileImageURL,
          name: cartItem.name,
          price: cartItem.price,
          count: 1,
        });
      }
    }

    localStorage.setItem('cartList', JSON.stringify(localCart));

    dispatch(addCartListItem(cartItem));

    if (isAuthenticated) {
      axios.put('https://express-hello-world-vc7k.onrender.com/data/users/updateCartList', {
        item: localCart,
        token: user.token,
      });
    }
  };

  return (
    <div className={styles.root}>
      {goods ? (
        <>
          <div>
            <img
              src={goods.imageURL}
              alt={goods.sku}
            />
          </div>
          <div>
            <div>
              <p>{goods.name}</p>
              <div>
                <div className={styles.rating}>
                  <span>★★★★★</span>
                  <span style={{ width: `${(goods.rating / 5) * 100}%` }}>
                    ★★★★★
                  </span>
                </div>
                <p>{goods.isAvailable ? 'В наявності' : 'Не в наявності'}</p>
              </div>
            </div>
            <div>
              <p>Дата створення: {goods.createdAt}</p>
              <p>Дата оновлення: {goods.updatedAt}</p>
            </div>
            <div>
              <p>{goods.price} грн</p>
              <button
                onClick={cartListHandler}
                className={isCartHaveThisGoods ? styles.active : ''}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 -960 960 960'
                  width='24px'
                  fill={isCartHaveThisGoods ? '#FFFFFF' : '#000000'}>
                  <path d='M221-120q-27 0-48-16.5T144-179L42-549q-5-19 6.5-35T80-600h190l176-262q5-8 14-13t19-5q10 0 19 5t14 13l176 262h192q20 0 31.5 16t6.5 35L816-179q-8 26-29 42.5T739-120H221Zm-1-80h520l88-320H132l88 320Zm260-80q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM367-600h225L479-768 367-600Zm113 240Z' />
                </svg>
                {isCartHaveThisGoods ? 'Товар в корзині' : 'В корзину'}
              </button>
            </div>
            <div>
              <p>{goods.shortDescription}</p>
              {Object.keys(goods.options).map((key, i) => (
                <div key={key}>
                  <p>{`${optionsValueList[key]}:`}</p>
                  <div>
                    {goods.options[key].map((item, i) => (
                      <button
                        onClick={() => handleClick(key, item)}
                        key={key + i + key}
                        className={
                          optionsState[key] === item ? styles.active : ''
                        }>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>{goods.fullDescription}</div>
          <div>
            <p>Схожі товари:</p>
            <div>
              {similarProducts ? (
                similarProducts.map((e, i) => (
                  <GoodsTile
                    {...e}
                    key={i}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <RotatingLines
          visible={true}
          height='96'
          width='96'
          color='#000000'
          strokeWidth='5'
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
          wrapperStyle={{}}
          wrapperClass=''
          strokeColor='#000000'
        />
      )}
    </div>
  );
}

export default GoodsPage;
