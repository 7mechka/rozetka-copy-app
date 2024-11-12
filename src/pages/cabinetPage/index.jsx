import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './CabinetPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from '../../components/authModal';
import { exit } from '../../redux/slices/userSlice';

function CabinetPage() {
  const { user, isAuthenticated } = useSelector((state) => state.userSlice);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setProfile(user);
    setIsLoading(true);
  }, [user]);

  const modalVisibleHandler = () => {
    setIsModalVisible(!isModalVisible);
  };

  const NotLoggined = () => {
    return (
      <div>
        <h1>
          Щоб подивитись особистий кабінет потрібно{' '}
          <span onClick={modalVisibleHandler}>авторизуватись</span>
        </h1>
      </div>
    );
  };

  const exitHandler = () => {
    localStorage.removeItem('token');
    dispatch(exit())
  };

  const Profile = () => {
    return (
      <div>
        <h1>Імя користувача: {profile.userName}</h1>
        <h2>Електронна пошта: {profile.email}</h2>
        <h2>Користувач створенний: {profile.createdAt}</h2>
        <h2>Останнє оновлення: {profile.updatedAt}</h2>
        <button onClick={exitHandler}>Вийти</button>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      {isLoading && <>{isAuthenticated ? <Profile /> : <NotLoggined />}</>}
      {isModalVisible && (
        <AuthModal modalVisibleHandler={modalVisibleHandler} />
      )}
    </div>
  );
}

export default CabinetPage;
