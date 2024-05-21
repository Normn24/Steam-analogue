import { HeaderWrapper, UserWrapper } from "./HeaderStyle";
import { NavLink } from "react-router-dom";
import { CiShoppingBasket, CiViewList, CiUser, CiLogout } from "react-icons/ci";
import { SiRepublicofgamers } from "react-icons/si";
import { Button } from "@mui/material";
import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../LogInForm/LogInForm";
import Logout from "../LogOut/LogOut";
import SignInForm from "../SignInForm/SignInForm";

export default function Header() {
  const loggedIn = localStorage.getItem("loggedIn");
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (newAction) => {
    setAction(newAction);
    setOpen(true);
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
            <NavLink to={"/account/profile"}>
              <CiUser />
            </NavLink>
            <NavLink onClick={() => handleOpen("logout")}>
              <CiLogout />
            </NavLink>
          </UserWrapper>
        ) : (
          <UserWrapper sx={{ fontSize: "medium" }}>
            <NavLink onClick={() => handleOpen("login")}>
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
          <LogInForm onSignUpClick={() => handleOpen("signup")} />
        ) : action === "signup" ? (
          <SignInForm onLoginClick={() => handleOpen("login")} />
        ) : (
          <Logout handleClose={handleClose} />
        )}
      </ModalWindow>
    </>
  );
}
