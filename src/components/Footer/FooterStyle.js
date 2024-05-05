import { styled } from '@mui/system';
import { Typography } from '@mui/material';


export const StyledFooter = styled('footer')({
    width: '100%',
    height: '170px',
    backgroundColor: '#F0F0F4',
    display: 'flex',
    gap: '40px',
    padding: "15px",
    flexDirection: "column",
});

export const InfoWrapper = styled('div')({
    display: 'flex',
    gap: "20px",
    justifyContent: "right"
});

export const StyledTitle = styled(Typography)({
    color: '#2f3035',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '18px',
    fontWeight: 700,
});

