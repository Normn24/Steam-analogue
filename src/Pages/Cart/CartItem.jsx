import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItemText, List, ListItem, } from '@mui/material';
import { grey } from '@mui/material/colors';
import { addToCart, removeToCart } from '../../redux/carts.slice/carts.slice';
import { useDispatch } from 'react-redux';
import Counter from '../../components/Counter/Counter';
import { decrementQuantity } from '../../redux/carts.slice/carts.slice';
import Payment from './Paymant';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';


export default function CartItem({product}) {
const dispatch = useDispatch()
const {name, imageUrls, developer, publisher, _id, quantity} = product
const [toggleModal, setToggleModal] = useState(false);

const incrementCounter = () => {
  dispatch(addToCart(product))
}
const decrementCounter = () => {
  dispatch(decrementQuantity(_id))
}


  return (
    <>
    <Card sx={{ 
      maxWidth: 345,
      background: 'grey',
     }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrls[0]}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Typography gutterBottom variant="h5" component="div">
          Options:
        </Typography>
        <List>
          <ListItem>
            <ListItemText secondary={developer} primary={<h3>developer</h3>}/> 
          </ListItem>
          <ListItem>
            <ListItemText secondary={publisher} primary={<h3>publisher</h3>}/> 
          </ListItem>
        </List>
        </Typography>
        <Counter number={quantity} incrementCounter={incrementCounter} decrementCounter={decrementCounter}/>
      </CardContent>
      <CardActions>
        <Button onClick={() => dispatch(removeToCart(_id))} size="small">Delete</Button>
        <Button onClick={() => {setToggleModal(true)}} size="small">Buy</Button>
      </CardActions>
    </Card>
    
    {toggleModal && (
      <Modal modalClose={() => setToggleModal(false)} isModal={toggleModal}>
          <Payment/>
      </Modal>
    )}
    </>
  );
}
