import { styled } from '@mui/system';
import { TextField, Button, Box, Typography } from '@mui/material';

export const FormContainer = styled(Box)({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  width: '400px',
  borderRadius: '0.75rem',
  backgroundColor: 'var(--header-background-color)',
  padding: '2rem',
  color: 'var(--text-color)',
  margin: "50px auto",

  "@media screen and (max-width: 600px)": {
    width: "270px",
  }
});

export const Title = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.5rem',
  lineHeight: '2rem',
  fontWeight: 700,
});

export const Form = styled('form')({
  marginTop: '1.5rem',
});

export const InputGroup = styled(Box)({
  marginTop: '0.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  width: "100%"
});

export const InputLabel = styled('label')({
  display: 'block',
  marginBottom: '4px',
});

export const StyledInput = styled(TextField)({
  width: '100%',
  borderRadius: '0.375rem',
  border: '#000',
  outline: 0,
  padding: '0',
  '&:focus': {
    borderColor: 'rgba(17, 24, 39, 1)',
  },
  '&:active': {
    borderColor: 'rgba(17, 24, 39, 1)',
  },
  '& .MuiInputBase-root': {
    color: "var(--text-color) !important",
  },
  "& .MuiOutlinedInput-root": {
    // '& fieldset': {           
    //     borderColor: "var(--header-background-color)",  
    // },
    "&.Mui-focused fieldset": {
        borderColor: "var(--header-tabs-hover-color)"
    },
    '&:hover fieldset': {
        borderColor: "var(--header-tabs-hover-color)", 
    },
},
});

export const Forgot = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: "row-reverse",
  fontSize: '16px',
  lineHeight: '1rem',
  color: '#ffff',
  margin: '14px 0 0',
});

export const SignButton = styled(Button)({
  marginTop: "14px",
  display: 'block',
  width: '100%',
  backgroundColor: '#000',
  padding: '0.75rem',
  textAlign: 'center',
  color: '#ffff',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#000',
    opacity: 0.8
  }
});

export const SignUp = styled(Box)({
  textAlign: 'center',
  fontSize: '16px',
  lineHeight: '1rem',

});

export const SocialMessage = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '1rem',
});

export const Line = styled(Box)({
  height: '1px',
  flex: 1,
  backgroundColor: '#000',
});

export const Message = styled(Box)({
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',

});

export const SocialIcons = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: '20px 0',
});

export const Icon = styled(Button)({
  borderRadius: '0.125rem',
  border: 'none',
  backgroundColor: 'transparent',
});

export const ErrorMessage = styled(Box)({
  color: "red",
});
