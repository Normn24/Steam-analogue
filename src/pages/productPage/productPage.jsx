import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductId } from "../../redux/productItem.slice/productItem.slice";
import styles from './styles.module.scss'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Container, Box, Tabs, Tab, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { Rating } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';


const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState({name: 'DARK SOULS REMASTERED', year: '24-05-2018', developer: 'QLOC', publisher: 'Bandai Namco Entertainment , From Softwate inc', rating: 84, genres: 'Соулс-лайк, Темне фентезі, Рольова гра, RPG', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570940/header.jpg?t=1700659167', price: 799, description: "Потім була пожежа. Знову відчуйте визнану критиками гру, що визначає жанр, з якої все почалося. Прекрасно оновлений, поверніться до Lordran у приголомшливій високій чіткості деталей зі швидкістю 60 кадрів в секунду. Dark Souls Remastered включає основну гру та DLC Artorias of the Abyss. Ключові особливості: • Глибокий і Темний Всесвіт • Кожен кінець — це новий початок • Багатство та можливості ігрового процесу • Почуття навчання, майстерності та досягнення • Шлях багатокористувацької гри (до 6 гравців із виділеними серверами)"});
  //setProduct({name: 'DARK SOULS REMASTERED', year: '24-05-2018', developer: 'QLOC', publisher: 'Bandai Namco Entertainment , From Softwate inc', rating: 84, genres: 'Соулс-лайк, Темне фентезі, Рольова гра, RPG', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570940/header.jpg?t=1700659167'})
  
  //const dispatch = useDispatch();
  //const { product, status } = useSelector((state) => state.product);
  
  //sx={{marginTop: '10px', borderCollapse: 'collapse', border-spacing: '0'}}
  
  const [favorite, setFavorite] = useState(false);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(product);

  /*useEffect(() => {
    dispatch(fetchProductId());
  }, [dispatch]);*/

  if (!product) {
    return <div className={styles.productContainer}>Loading...</div>;
  }

  return (
    <Container sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: '20px 0', gap: '20px', fontFamily: '"Gill Sans", sans-serif'}}>
      <Box component="div" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '50px'}}>
        <Box component="div" sx={{marginTop: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative', width: '60%'}}>
          <Button variant='contained' sx={{position: 'absolute', width: '30%'}}>Sale</Button>
          <img src={product.imageUrl} alt={product.name} className={styles.productImg}/>
          <h2>{product.price} ₴</h2> 
        </Box>
        <Box component="div" sx={{textAlign: 'left'}}>
           <h3>{product.name}</h3>
           <Box component="div" sx={{display: 'flex', justifyContent: 'flex-start', gap: '20p'}}>
             {!favorite && <AiOutlineHeart style={{height: '25px', width: 'auto', color: '#828386'}}/>}
             {favorite && <AiFillHeart style={{height: '25px', width: 'auto', color: '#828386'}}/>}
             <Box component="div" sx={{display: 'flex', alignItems: 'center', gap: '12px'}}><Rating name="half-rating" defaultValue={product.rating / 100 * 5} precision={0.1} /><span>{product.rating} / 100</span></Box>
           </Box>
           
           <Table >
              <TableBody>
              <TableRow>
                <TableCell sx={{ minWidth: '150px' }}>Дата виходу</TableCell>
                <TableCell>{product.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Розробник</TableCell>
                <TableCell>{product.developer}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Видавець</TableCell>
                <TableCell>{product.publisher}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Жанр</TableCell>
                <TableCell>{product.genres}</TableCell>
              </TableRow>
              </TableBody>
           </Table>
           <Button variant='contained' sx={{marginTop: '20px', fontSize: '18px', width: '30%'}}>Купити</Button>
        </Box>
      </Box>
      <Box component="div">
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
        <TabPanel value="1" index={0} sx={{textAlign: 'left', fontSize: '18px'}}>{product.description}</TabPanel>
        <TabPanel value="2" index={1}>Tab Two</TabPanel>
      </TabContext>
      </Box>
      <div className="products-carousel"></div>
    </Container>
  );
};

export default ProductPage;