import { HeaderWrapper, UserWrapper } from "./HeaderStyle";
import { NavLink } from "react-router-dom";
import { CiShoppingBasket, CiViewList, CiUser, CiLogout } from "react-icons/ci";
import { SiRepublicofgamers } from "react-icons/si";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../LogInForm/LogInForm";

export default function Header() {
  const loggedIn = localStorage.getItem("loggedIn");
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const openLogout = () => {
    setOpen(true);
    setAction("logout");
  };
  const openLoginForm = () => {
    setOpen(true);
    setAction("login");
  };

  const logout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("token");
    setOpen(false);
    window.location.href = "/";
  };
  return (
    <>
      <HeaderWrapper>
        <NavLink to={"/"}>
          <SiRepublicofgamers style={{ fontSize: "50px" }} />
        </NavLink>
        {loggedIn === "true" ? (
          <UserWrapper>
            <NavLink to={"/wishlist"}>
              <CiViewList />
            </NavLink>
            <NavLink to={"/cart"}>
              <CiShoppingBasket />
            </NavLink>
            <NavLink>
              <CiUser />
            </NavLink>
            <NavLink onClick={openLogout}>
              <CiLogout />
            </NavLink>
          </UserWrapper>
        ) : (
          <UserWrapper sx={{ fontSize: "medium" }}>
            <NavLink onClick={openLoginForm}>
              <Button
                variant="contained"
                sx={{
                  padding: "4px 19px 2px",
                  borderRadius: "5px",
                  borderColor: "#000",
                  backgroundColor: "#000",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                login
              </Button>
            </NavLink>
          </UserWrapper>
        )}
      </HeaderWrapper>

      <ModalWindow open={open} handleClose={handleClose}>
        {action === "login" ? (
          <LogInForm />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: "200px",
              boxShadow: 24,
              p: 4,
              borderRadius: "6px",
              backgroundColor: "#ffff",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{ textAlign: "center" }}
            >
              Are you sure?
            </Typography>
            <Box
              sx={{ display: "flex", gap: "25px", justifyContent: "center" }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </ModalWindow>
    </>
  );
}
