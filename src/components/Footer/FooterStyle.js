import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledFooter = styled('footer')({
    width: '100%',
    height: '232px',
    backgroundColor: '#F0F0F4',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
});

export const InfoWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const StyledTitle = styled(Typography)({
    color: '#2f3035',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '24px',
    fontWeight: 700,
});

export const StyledNavLink = styled(NavLink)({
    color: '#2f3035',
    textDecoration: 'none',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '20px',
    fontWeight: 500,
});

