import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from "react-router-dom";

export const NavBarWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    height: "56px",
    color: "#F0F0F4",
    backgroundColor: "var(--header-tabs-background-color)",
    "@media (max-width: 600px)": {
        justifyContent: "center",
    },

});

export const SearchField = styled(TextField)({
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

export const StyledNavBarLink = styled(NavLink)({
    minWidth: "120px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 15px",
    color: "var(--text-color)",
    textDecoration: 'none',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    textTransform: "uppercase",
    "&:hover": {
        borderBottom: "4px solid var(--header-tabs-hover-color)",
        borderRadius: "4px",
    },

    "&.active": {
        borderBottom: "4px solid var(--header-tabs-hover-color)",
        borderRadius: "4px",
    },


    "@media (max-width: 960px)": {
        display: "none",
    },
});
