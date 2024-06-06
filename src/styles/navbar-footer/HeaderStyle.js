import { Box, styled } from "@mui/material";

export const HeaderWrapper = styled(Box)({
    height: "40px",
    width: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 8.5px 5px 40px",
    backgroundColor: "#bdbdbd",

})

export const UserWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    fontSize: "26px",
    gap: "18px"
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

