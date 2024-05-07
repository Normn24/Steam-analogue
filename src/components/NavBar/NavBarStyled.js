import { styled } from '@mui/system';
import { NavLink } from "react-router-dom";

export const NavBarWrapper = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    height: "auto",
    backgroundColor: "#F0F0F4",
});

export const NavBarItem = styled("div")({
    width: "150px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        borderBottom: "4px solid #1c62cd",
    },
});

export const StyledNavBarLink = styled(NavLink)({
    color: '#2f3035',
    textDecoration: 'none',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '20px',
    fontWeight: 500,
});
