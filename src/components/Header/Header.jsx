import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearRegistrationState } from "../../redux/auth.slice/signup.slice";
import { clearAuthState } from "../../redux/auth.slice/login.slice";
import { Button } from "@mui/material";
import {
  HeaderWrapper,
  UserWrapper,
  CountIndicator,
} from "../../styles/navbar-footer/HeaderStyle";
import { SiRepublicofgamers } from "react-icons/si";
import { SiYoutubegaming } from "react-icons/si";
import { FaUserAstronaut } from "react-icons/fa6";
import { GiDiceFire, GiFlamethrowerSoldier } from "react-icons/gi";

import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../LogInForm/LogInForm";
import Logout from "../LogOut/LogOut";
import SignInForm from "../SignInForm/SignInForm";

export default function Header() {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.login.loggedIn);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);

  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (newAction) => {
    setAction(newAction);
    setOpen(true);
    dispatch(clearRegistrationState());
    dispatch(clearAuthState());
  };

  return (
    <>
      <HeaderWrapper>
        <NavLink to={"/"}>
          <SiRepublicofgamers style={{ fontSize: "50px" }} />
        </NavLink>
        {loggedIn ? (
          <UserWrapper>
            <NavLink to={"/wishlist"} style={{ position: "relative" }}>
              <SiYoutubegaming />
              <CountIndicator>{wishList?.products?.length}</CountIndicator>
            </NavLink>
            <NavLink to={"/cart"} style={{ position: "relative" }}>
              <GiDiceFire />
              <CountIndicator>
                {cart ? cart?.products?.length : 0}
              </CountIndicator>
            </NavLink>
            <NavLink to={"/account/profile"}>
              <FaUserAstronaut />
            </NavLink>
            <NavLink onClick={() => handleOpen("logout")}>
              <GiFlamethrowerSoldier />
            </NavLink>
          </UserWrapper>
        ) : (
          <UserWrapper style={{ fontSize: "medium" }}>
            <NavLink onClick={() => handleOpen("login")}>
              <Button
                variant="contained"
                style={{
                  padding: "4px 19px 2px",
                  borderRadius: "5px",
                  borderColor: "#000",
                  backgroundColor: "#000",
                  color: "#fff",
                  boxShadow: "none",
                  fontWeight: 600,
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
          <LogInForm
            onSignUpClick={() => handleOpen("signup")}
            handleClose={handleClose}
          />
        ) : action === "signup" ? (
          <SignInForm onLoginClick={() => handleOpen("login")} />
        ) : (
          <Logout handleClose={handleClose} />
        )}
      </ModalWindow>
    </>
  );
}
