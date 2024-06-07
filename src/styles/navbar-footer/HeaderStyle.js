import { Box, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const HeaderWrapper = styled(Box)({
    height: "40px",
    width: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 8.5px 5px 40px",
    backgroundColor: "#bdbdbd",

    "@media (max-width: 600px)": {
        padding: "5px 15px",
    },

})

export const UserWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    fontSize: "26px",
    gap: "18px",

    "@media (max-width: 600px)": {
        display: "none",
    },
})

export const CountIndicator = styled(Box)({
    position: "absolute",
    right: "-10px",
    top: "-2px",
    display: "flex",
    alignItems: "center",
    fontSize: "10px",
    fontWeight: 900,
    justifyContent: "center",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "50%",
    padding: "1px 6px"
})

export const BurgerItem = styled(NavLink)({
    padding: "12px 16px",
    borderRadius: "4px",
    boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",


})

