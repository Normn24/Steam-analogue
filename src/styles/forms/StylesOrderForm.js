import { styled } from '@mui/system';
import { TextField, Button, Box, Typography } from '@mui/material';

export const FormContainer = styled(Box)({
  width: "67%",
  borderRadius: '6px',
  backgroundColor: 'var(--card-background-color)',
  padding: '20px',
  margin: "50px 20px",
  boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
  "@media (max-width: 960px)": {
    width: "auto"
  },
});

export const Title = styled(Typography)({
  textTransform: "uppercase",
  fontSize: '1.5rem',
  lineHeight: '2rem',
  fontWeight: 700,

  "@media (max-width: 960px)": {
    fontSize: '20px',
  },
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
  backgroundColor: 'var(--card-background-color)',
  color: 'var(--text-color)',
  padding: '0',
  '&:focus': {
    borderColor: 'rgba(167, 139, 250)',
  },
  "& .MuiOutlinedInput-root": {
    '& fieldset': {           
        borderColor: "var(--header-background-color)",  
    },
    "&.Mui-focused fieldset": {
        borderColor: "var(--header-background-color)"
    },
    '&:hover fieldset': {
        borderColor: "var(--header-tabs-hover-color)", 
    },
    },
    '& label.Mui-focused': {
        color: "var(--text-color)",
    },
    '& label.Mui-root': {
        color: "var(--text-color)",
    },
    '& .MuiInputBase-root': {
        color: "var(--text-color) !important",
    },
    '& .MuiInputLabel-root': {
        color: "var(--input-color)"
    },

});

export const SubmitButton = styled(Button)({
  marginTop: "14px",
  display: 'block',
  width: '120px',
  padding: '0.75rem',
  textAlign: 'center',
  borderRadius: '0.375rem',
  fontWeight: 600,
  borderColor: "#000"
});