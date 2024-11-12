import { useEffect, useState } from 'react';
import GoodsTile from '../../components/goodsTile';
import SideBar from '../../components/sideBar';
import styles from './Home.module.scss';
import axios from 'axios';

function Home() {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    axios
      .get('https://express-hello-world-vc7k.onrender.com/data/items')
      .then((res) => setItemsList(res.data));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h3>Популярні товари:</h3>
      </div>
      <div className={styles.container}>
        <SideBar list={itemsList} />
        <div className={styles.main}>
          {itemsList
            ? itemsList.map((e, i) => (
                <GoodsTile
                  {...e}
                  key={i}
                />
              ))
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Home;
