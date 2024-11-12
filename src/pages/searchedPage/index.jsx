import { useEffect, useState } from 'react';
import GoodsTile from '../../components/goodsTile';
import SideBar from '../../components/sideBar';
import styles from './SearchedPage.module.scss';
import axios from 'axios';
import { useParams } from 'react-router';

function SearchedPage() {
  const { text, tags, category } = useParams();
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setItemsList([]);

    const queryParams = {
      text: text === '-' ? null : text,
      tags: tags === '-' ? null : tags,
      category: category === '-' ? null : category,
    };

    axios
      .get('https://express-hello-world-vc7k.onrender.com/data/items/search', {
        params: {
          text: queryParams.text,
          tags: queryParams.tags,
          category: queryParams.category,
        },
      })
      .then((res) => setItemsList(res.data));
  }, [text, tags, category]);

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h3>Результати пошуку:</h3>
      </div>
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          {itemsList.length > 0 ? (
            itemsList.map((e, i) => (
              <GoodsTile
                {...e}
                key={i}
              />
            ))
          ) : (
            <h2>Товар не знайдено</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchedPage;
