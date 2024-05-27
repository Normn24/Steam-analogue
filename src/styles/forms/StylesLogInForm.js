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
  backgroundColor: 'rgba(17, 24, 39, 1)',
  padding: '2rem',
  color: 'rgba(243, 244, 246, 1)',
  margin: "50px auto"
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
});

export const InputLabel = styled('label')({
  display: 'block',
  color: 'rgba(156, 163, 175, 1)',
  marginBottom: '4px',
});

export const StyledInput = styled(TextField)({
  width: '100%',
  borderRadius: '0.375rem',
  border: '1px solid rgba(55, 65, 81, 1)',
  outline: 0,
  backgroundColor: 'rgba(17, 24, 39, 1)',
  padding: '0',
  color: 'rgba(243, 244, 246, 1)',
  '&:focus': {
    borderColor: 'rgba(167, 139, 250)',
  },
});

export const Forgot = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '16px',
  lineHeight: '1rem',
  color: '#ffff',
  margin: '14px 0 0',
});

export const SignButton = styled(Button)({
  marginTop: "14px",
  display: 'block',
  width: '100%',
  backgroundColor: 'rgba(167, 139, 250, 1)',
  padding: '0.75rem',
  textAlign: 'center',
  color: 'rgba(17, 24, 39, 1)',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: 600,
});

export const SignUp = styled(Box)({
  textAlign: 'center',
  fontSize: '16px',
  lineHeight: '1rem',
  color: 'rgba(156, 163, 175, 1)',
});

export const SocialMessage = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '1rem',
});

export const Line = styled(Box)({
  height: '1px',
  flex: 1,
  backgroundColor: 'rgba(55, 65, 81, 1)',
});

export const Message = styled(Box)({
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'rgba(156, 163, 175, 1)',
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
