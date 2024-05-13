import { styled } from '@mui/system';
import { Typography } from '@mui/material';


export const StyledFooter = styled('footer')({
    width: 'auto',
    height: 'auto',
    backgroundColor: '#bdbdbd',
    display: 'flex',
    gap: '10px',
    // padding: "15px",
    flexDirection: "column",
    borderRadius: "6px 6px 0 0",
});

export const InfoWrapper = styled('div')({
    display: 'flex',
    gap: "10px",
    justifyContent: "right",
    fontSize: "40px",
    padding: "0 20px",

});

export const StyledTitle = styled(Typography)({
    color: '#2f3035',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    padding: "15px 20px",

});

