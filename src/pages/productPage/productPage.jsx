import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import Button from '../../components/button/Button';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Box, Tabs, Tab } from '@mui/material';
import { Rating } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState({name: 'DARK SOULS REMASTERED', year: '24-05-2018', developer: 'QLOC', publisher: 'Bandai Namco Entertainment , From Softwate inc', rating: 84, genres: 'Соулс-лайк, Темне фентезі, Рольова гра, RPG', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570940/header.jpg?t=1700659167', price: 799, description: "Потім була пожежа. Знову відчуйте визнану критиками гру, що визначає жанр, з якої все почалося. Прекрасно оновлений, поверніться до Lordran у приголомшливій високій чіткості деталей зі швидкістю 60 кадрів в секунду. Dark Souls Remastered включає основну гру та DLC Artorias of the Abyss. Ключові особливості: • Глибокий і Темний Всесвіт • Кожен кінець — це новий початок • Багатство та можливості ігрового процесу • Почуття навчання, майстерності та досягнення • Шлях багатокористувацької гри (до 6 гравців із виділеними серверами)"});
  //setProduct({name: 'DARK SOULS REMASTERED', year: '24-05-2018', developer: 'QLOC', publisher: 'Bandai Namco Entertainment , From Softwate inc', rating: 84, genres: 'Соулс-лайк, Темне фентезі, Рольова гра, RPG', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570940/header.jpg?t=1700659167'})
  const [favorite, setFavorite] = useState(false);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(product);

  /*useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);*/

  if (!product) {
    return <div className={styles.productContainer}>Loading...</div>;
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productItem}>
        <div className={styles.productCard}>
          <Button darkButton classNames={styles.salesButton}>Sale</Button>
          <img src={product.imageUrl} alt={product.name} classNames={styles.productImg}/>
          <h2>{product.price} ₴</h2>
          
        </div>
        <div className={styles.productDescription}>
           <h3>{product.name}</h3>
           <div className={styles.ratingCont}>
             {!favorite && <AiOutlineHeart className={styles.favoriteItem}/>}
             {favorite && <AiFillHeart className={styles.favoriteItem}/>}
             <div className={styles.ratingLine}><Rating name="half-rating" defaultValue={product.rating / 100 * 5} precision={0.1} /><span>{product.rating} / 100</span></div>
           </div>
           <table>
              <tbody>
              <tr>
                <td>Дата виходу</td>
                <td>{product.year}</td>
              </tr>
              <tr>
                <td>Розробник</td>
                <td>{product.developer}</td>
              </tr>
              <tr>
                <td>Видавець</td>
                <td>{product.publisher}</td>
              </tr>
              <tr>
                <td>Жанр</td>
                <td>{product.genres}</td>
              </tr>
              </tbody>
           </table>
           <Button darkButton classNames={styles.buyButton}>Купити</Button>
        </div>
      </div>
      <div className={styles.productOptions}>
      <TabContext value={value}>
       <Box sx={{borderBottom: 1, borderColor: 'divider', backgroundColor: '#fff'}}>
        <Tabs
        value={value}
        onChange={handleChange}
        centered
        variant="fullWidth"
        
        TabIndicatorProps={{sx: {backgroundColor: 'blue', color: 'black'}}}
        aria-label="secondary tabs example"
        sx ={{
          border: 'none',
          "& button": {},
          "& button:hover": {backgroundColor: '#c4c4c4', fontWeight: 500},
          "& button:active": {borderColor: 'transparent'},
          "& button:Mui-selected": {backgroundColor: 'transparent'}
        }}
        >
          <Tab value="1" label="Опис" />
          <Tab value="2" label="Системні вимоги" />
        </Tabs>
       </Box>
        <TabPanel value="1" index={0} className={styles.tabText}>{product.description}</TabPanel>
        <TabPanel value="2" index={1}>Tab Two</TabPanel>
      </TabContext>
      </div>
      <div className="products-carousel"></div>
    </div>
  );
};

export default ProductPage;