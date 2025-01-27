import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearRegistrationState } from "../../redux/auth.slice/signup.slice";
import { clearAuthState } from "../../redux/auth.slice/login.slice";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoIosArrowDown } from "react-icons/io";
import {
  HeaderWrapper,
  UserWrapper,
  CountIndicator,
  BurgerItem,
} from "../../styles/navbar-footer/HeaderStyle";
import { SiRepublicofgamers, SiYoutubegaming } from "react-icons/si";
import { FaUserAstronaut } from "react-icons/fa6";
import { GiDiceFire, GiFlamethrowerSoldier } from "react-icons/gi";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../LogInForm/LogInForm";
import Logout from "../LogOut/LogOut";
import SignInForm from "../SignInForm/SignInForm";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

export default function Header() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const { catalogs } = useSelector((state) => state.catalogs);

  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleClose = () => setOpen(false);

  const handleOpen = (newAction) => {
    setAction(newAction);
    setOpen(true);
    dispatch(clearRegistrationState());
    dispatch(clearAuthState());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 220, display: "flex", flexDirection: "column" }}>
      <BurgerItem to="/" onClick={handleLinkClick} style={{ display: "block" }}>
        Home
      </BurgerItem>
      <Accordion
        sx={{
          backgroundColor: "transparent",
          minHeight: "auto",
          "&::before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          aria-controls="panel-content"
          id="panel-header"
          expandIcon={<IoIosArrowDown />}
        >
          <Typography variant="p" component="p">
            Categories
          </Typography>
        </AccordionSummary>
        {catalogs.slice(0, 3).map((catalog) => (
          <AccordionDetails key={catalog.id}>
            <NavLink
              to={`/products/category/${catalog.name}`}
              onClick={handleLinkClick}
              style={{ display: "block" }}
            >
              {catalog.name}
            </NavLink>
          </AccordionDetails>
        ))}
      </Accordion>
      {token && (
        <>
          <BurgerItem  to="/account/profile" onClick={handleLinkClick}>
            Profile
          </BurgerItem>
          <BurgerItem  to="/products/library" onClick={handleLinkClick}>
            Library
          </BurgerItem>
          <BurgerItem  to="/wishlist" onClick={handleLinkClick}>
            Wishlist
          </BurgerItem>
          <BurgerItem  to="/cart" onClick={handleLinkClick}>
            Cart
          </BurgerItem>
          <BurgerItem
            
            onClick={() => {
              handleOpen("logout");
              handleLinkClick();
            }}
          >
            Logout
          </BurgerItem>
        </>
      )}

      {!token && (
        <BurgerItem
          
          onClick={() => {
            handleOpen("login");
            handleLinkClick();
          }}
        >
          Login
        </BurgerItem>
      )}
    </Box>
  );

  return (
    <>
      <HeaderWrapper>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ margin: 0, padding: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <NavLink to={"/"} style={{ display: { xs: "none", md: "flex" } }}>
          <SiRepublicofgamers style={{ fontSize: "50px", color: "var(--text-color)" }} />
        </NavLink>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <button onClick={toggleTheme} color="inherit" style={{ marginRight: "15px", padding: "0", border: "none", background: "none" }}>
          {theme === 'light' ? <Brightness4Icon style={{color: "var(--text-color)"}}/> : <Brightness7Icon style={{color: "var(--text-color)"}}/>}
        </button>    
        {token ? (
          <UserWrapper>
            <NavLink to={"/wishlist"} style={{ position: "relative" }}>
              <SiYoutubegaming style={{color: "var(--text-color)"}}/>
              <CountIndicator>
                {wishList?.products ? wishList?.products?.length : 0}
              </CountIndicator>
            </NavLink>
            <NavLink to={"/cart"} style={{ position: "relative" }}>
              <GiDiceFire style={{color: "var(--text-color)"}}/>
              <CountIndicator>
                {cart?.products ? cart?.products?.length : 0}
              </CountIndicator>
            </NavLink>
            <NavLink to={"/account/profile"}>
              <FaUserAstronaut style={{color: "var(--text-color)"}}/>
            </NavLink>
            <NavLink onClick={() => handleOpen("logout")}>
              <GiFlamethrowerSoldier style={{color: "var(--text-color)"}}/>
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
        </Box>
      </HeaderWrapper>

      <ModalWindow open={open} handleClose={handleClose}>
        {action === "login" ? (
          <LogInForm
            onSignUpClick={() => handleOpen("signup")}
            handleClose={handleClose}
            onForgotPasswordClick={() => handleOpen("forgotPassword")}
          />
        ) : action === "signup" ? (
          <SignInForm onLoginClick={() => handleOpen("login")} />
        ) : action === "forgotPassword" ? (
          <ForgotPasswordForm onSignUpClick={() => handleOpen("signup")} />
        ) : (
          <Logout handleClose={handleClose} />
        )}
      </ModalWindow>
    </>
  );
}
