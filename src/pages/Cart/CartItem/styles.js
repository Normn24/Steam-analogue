
import { makeStyles } from '@mui/styles';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


export const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  marginRight: '20px'
});


export const MyButtonDelete = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});



export const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})


