import { styled } from '@mui/system';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";


export const UserPageContainer = styled(Box)({
    display: "flex",
    gap: "30px",
    margin: "30px 20px",
    minHeight: "calc(100vh - 282px)",
});

export const UserNav = styled(Paper)({
    display: "flex",
    flexDirection: "column",
    width: "250px",
    height: "330px",
    backgroundColor: "#BDBDBD",
    boxShadow:
        "0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)",
    borderRadius: "5px",
});

export const UserInfo = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "20px",
});

export const UserItem = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "250px",
});

export const NavText = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "15px",
});

export const NavLinkStyled = styled(NavLink)({
    display: "flex",
    padding: "15px 0",
    alignItems: "center",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
    position: "relative",
    "&.active": {
        backgroundColor: "#CCCCCC",
        cursor: "pointer",
        borderRadius: "5px",
    },
    "&::before": {
        content: "''",
        position: "absolute",
        top: "0",
        left: "0px",
        width: "100%",
        height: "1px",
        backgroundColor: "#737373",
    },
});

export const ContentArea = styled(Box)({
    width: "960px"
});
