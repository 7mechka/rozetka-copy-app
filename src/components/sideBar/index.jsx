import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SideBar() {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    axios.get('https://express-hello-world-vc7k.onrender.com/data/items').then((res) => {
      const data = res.data;

      let updatedList = [];
      data.forEach((e) => {
        if (!updatedList.includes(e.category)) {
          updatedList.push(e.category);
        }
      });

      setGoods(updatedList);
    });
  }, []);

  return (
    <div className={styles.root}>
      {goods
        ? goods.map((e, i) => (
            <Link
              to={`/goods/search/-/-/${e}`}
              key={e}>
              <p>{e}</p>
            </Link>
          ))
        : ''}
    </div>
  );
}

export default SideBar;
