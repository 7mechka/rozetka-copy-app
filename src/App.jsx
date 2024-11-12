import { Route, Routes } from 'react-router';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import Header from './components/header';
import GoodsPage from './pages/goodsPage';
import SearchedPage from './pages/searchedPage';
import CartPage from './pages/cartPage';
import { useLayoutEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/userSlice';
import CabinetPage from './pages/cabinetPage';
import { setCartList } from './redux/slices/cartSlice';

function App() {
  const dispath = useDispatch();

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');

    const cartList = JSON.parse(localStorage.getItem('cartList'));

    if (token) {
      axios
        .get('https://express-hello-world-vc7k.onrender.com/data/users/checkToken', {
          params: { token: token },
        })
        .then((res) => {
          dispath(login(res.data));

          if (res.data.cart.length > 0) {
            localStorage.setItem('cartList', JSON.stringify(res.data.cart));
            res.data.cart.forEach((item) => {
              dispath(setCartList(item));
            });
          } else {
            localStorage.removeItem('cartList');
          }
        });
    } else if (cartList) {
      cartList.forEach((item) => {
        dispath(setCartList(item));
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/goods/:sku'
          element={<GoodsPage />}
        />
        <Route
          path='/goods/search/:text?/:tags?/:category'
          element={<SearchedPage />}
        />
        <Route
          path='/cart'
          element={<CartPage />}
        />
        <Route
          path='/cabinet'
          element={<CabinetPage />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
