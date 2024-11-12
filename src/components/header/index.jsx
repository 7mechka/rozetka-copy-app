import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import AuthModal from '../authModal';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [authModalIsVisible, setAuthModalIsVisible] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const cart = useSelector((state) => state.cartSlice);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    event.target.search.value = '';

    navigate(`/goods/search/${values.search}/-/-`);
  };

  const cabinetClickHandle = () => {
    if (isAuthenticated) {
      navigate(`/cabinet`);
      return;
    }
    setModalIsVisible(!modalIsVisible);
  };

  const authClickHandle = () => {
    setAuthModalIsVisible(!authModalIsVisible);
  };

  useEffect(() => {
    setModalIsVisible(false);
  }, [authModalIsVisible]);

  return (
    <>
      {authModalIsVisible && (
        <AuthModal
          modalVisibleHandler={authClickHandle}
        />
      )}
      <div className={styles.root}>
        <div className={styles.logo}>
          <Link to='/'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              fill='#FFFFFF'
              version='1.1'
              id='Capa_1'
              viewBox='0 0 60 60'
              xmlSpace='preserve'>
              <path d='M42,12H18C8.075,12,0,20.075,0,30s8.075,18,18,18h24c9.925,0,18-8.075,18-18S51.925,12,42,12z M18,38c0,0.553-0.447,1-1,1  s-1-0.447-1-1V22c0-0.553,0.447-1,1-1s1,0.447,1,1V38z M42,43c-7.168,0-13-5.832-13-13s5.832-13,13-13s13,5.832,13,13  S49.168,43,42,43z' />
            </svg>
            <p>Switch</p>
          </Link>
        </div>
        <div className={styles.search}>
          <form
            action='#'
            onSubmit={handleSubmit}>
            <input
              name='search'
              type='text'
              placeholder='Я шукаю...'
              minLength='3'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#5f6368'>
              <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
            </svg>
          </form>
        </div>
        <div className={styles.cabinet}>
          <button onClick={cabinetClickHandle}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#FFFFFF'>
              <path d='M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z' />
            </svg>
          </button>
          {modalIsVisible && (
            <div>
              <p>
                Щоб перейти в особистий кабінет потрібно{' '}
                <span onClick={authClickHandle}>авторизуватись</span>
              </p>
            </div>
          )}
        </div>
        <div className={styles.cart}>
          <Link to='/cart'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#FFFFFF'>
              <path d='M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z' />
            </svg>
            {cart.length > 0 && (
              <span>
                <p>{cart.length > 9 ? '9+' : cart.length}</p>
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
