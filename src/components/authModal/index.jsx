import { useState } from 'react';
import styles from './AuthModal.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router';

function ErrorModal({ msg }) {
  return (
    <div className={styles.error}>
      <p>{msg}</p>
    </div>
  );
}

function LoginModal({ handler, errorHandler, modalVisibleHandler }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    if (values.login === '') {
      errorHandler('Помилка: поля пусті');
      return;
    }

    axios
      .get('https://express-hello-world-vc7k.onrender.com/data/users/get', {
        params: { login: values.login, password: values.password },
      })
      .then((res) => {
        if (res.data === '!user') {
          console.log(res.data);
          errorHandler('Даний користувач не існує');
        } else if (res.data === '!password') {
          console.log(res.data);
          errorHandler('Введено не правильний пароль');
        } else {
          modalVisibleHandler();
          localStorage.setItem('token', res.data.token);
          dispatch(login(res.data));
          navigate('/');
          window.location.reload();
        }
      });
  };
  return (
    <div className={styles.login}>
      <div
        className={styles.closeModal}
        onClick={modalVisibleHandler}>
        X
      </div>
      <form
        action='#'
        onSubmit={submitHandler}>
        <label>
          Логін
          <input
            type='text'
            name='login'
            minLength='5'
          />
        </label>
        <label>
          Пароль
          <input
            type='password'
            name='password'
            minLength='5'
          />
        </label>
        <button>Увійти</button>
      </form>
      <p>
        Ще не створили акаунт? <span onClick={handler}>Створити</span>
      </p>
    </div>
  );
}

function RegisterModal({ handler, errorHandler, modalVisibleHandler }) {
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    if (values.password === values.confirmPassword) {
      axios
        .post('https://express-hello-world-vc7k.onrender.com/data/users/add', {
          login: values.login,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data === 'user') {
            errorHandler('Користувач з таким логіном уже існує');
            return;
          } else if (res.data === true) {
            modalVisibleHandler('login');
          } else {
            console.log(res.data);
            errorHandler('Помилка');
            return;
          }
        });
    } else {
      errorHandler('Паролі на співпадають');
      return;
    }
  };
  return (
    <div className={styles.register}>
      <div
        className={styles.closeModal}
        onClick={modalVisibleHandler}>
        X
      </div>
      <form
        action='#'
        onSubmit={(e) => submitHandler(e)}>
        <label htmlFor=''>
          Логін
          <input
            type='text'
            name='login'
          />
        </label>
        <label htmlFor=''>
          Пошта
          <input
            type='email'
            name='email'
          />
        </label>
        <label htmlFor=''>
          Пароль
          <input
            type='password'
            name='password'
          />
        </label>
        <label htmlFor=''>
          Повторення пароля
          <input
            type='password'
            name='confirmPassword'
          />
        </label>
        <button>Створити</button>
      </form>
      <p>
        Уже маєте акаунт? <span onClick={handler}>Увійти</span>
      </p>
    </div>
  );
}

function AuthModal({ modalVisibleHandler }) {
  const [status, setStatus] = useState('login');
  const [incorrectModal, setIncorrectModal] = useState(false);

  const statusHandler = (e) => {
    if (e.target.innerText === 'Увійти') {
      setStatus('login');
    } else {
      setStatus('register');
    }
  };

  const showError = (msg) => {
    console.log('msg');
    setIncorrectModal(msg);
    setTimeout(() => {
      setIncorrectModal(false);
    }, 2000);
  };

  return (
    <div className={styles.root}>
      {incorrectModal !== false && <ErrorModal msg={incorrectModal} />}
      {status === 'login' ? (
        <LoginModal
          handler={statusHandler}
          errorHandler={showError}
          modalVisibleHandler={modalVisibleHandler}
        />
      ) : (
        <RegisterModal
          handler={statusHandler}
          errorHandler={showError}
          modalVisibleHandler={modalVisibleHandler}
        />
      )}
    </div>
  );
}

export default AuthModal;
