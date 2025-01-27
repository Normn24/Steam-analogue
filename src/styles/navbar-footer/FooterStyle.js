import { styled } from '@mui/system';
import { Typography } from '@mui/material';


export const StyledFooter = styled('footer')({
    width: 'auto',
    height: 'auto',
    backgroundColor: 'var(--header-background-color)',
    display: 'flex',
    gap: '10px',
    // padding: "15px",
    flexDirection: "column",
    borderRadius: "6px 6px 0 0",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px"
});

export const InfoWrapper = styled('div')({
    display: 'flex',
    gap: "10px",
    justifyContent: "right",
    fontSize: "40px",
    padding: "0 20px",

});

export const StyledTitle = styled(Typography)({
    color: 'var(text-color)',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    padding: "15px 20px",

});

