import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from "react-router-dom";

export const NavBarWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    height: "56px",
    backgroundColor: "#F0F0F4",

    "@media (max-width: 600px)": {
        justifyContent: "center",
    },

});

export const StyledNavBarLink = styled(NavLink)({
    minWidth: "120px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 15px",
    color: '#000',
    textDecoration: 'none',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    textTransform: "uppercase",
    "&:hover": {
        borderBottom: "4px solid #000",
        borderRadius: "4px",
    },

    "&.active": {
        borderBottom: "4px solid #000",
        borderRadius: "4px",
    },


    "@media (max-width: 960px)": {
        display: "none",
    },
});
