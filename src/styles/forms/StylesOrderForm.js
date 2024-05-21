import { styled } from '@mui/system';
import { TextField, Button, Box, Typography } from '@mui/material';

export const FormContainer = styled(Box)({
  width: 'min-content',
  borderRadius: '6px',
  backgroundColor: '#bdbdbd',
  padding: '20px',
  color: "#000",
  margin: "50px 20px",
  boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",

});

export const Title = styled(Typography)({
  textTransform: "uppercase",
  fontSize: '1.5rem',
  lineHeight: '2rem',
  fontWeight: 700,
});

export const Form = styled('form')({
  marginTop: '25px',
});

export const InputGroup = styled(Box)({
  display: "flex",
  flexDirection: "column"
});

export const StyledInput = styled(TextField)({
  marginTop: "15px",
  borderRadius: '0.375rem',
  outline: 0,
  backgroundColor: '#bdbdbd',
  padding: '0',
  color: 'rgba(243, 244, 246, 1)',
  '&:focus': {
    borderColor: 'rgba(167, 139, 250)',
  },
});

export const SubmitButton = styled(Button)({
  marginTop: "14px",
  display: 'block',
  width: '120px',
  padding: '0.75rem',
  textAlign: 'center',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: 600,
});