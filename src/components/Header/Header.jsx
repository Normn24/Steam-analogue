import { HeaderWrapper, UserWrapper } from "./HeaderStyle";
import { NavLink } from "react-router-dom";
import { CiShoppingBasket, CiViewList, CiUser, CiLogout } from "react-icons/ci";
// import { CiUser } from "react-icons/ci";
// import { CiViewList } from "react-icons/ci";
import { SiRepublicofgamers } from "react-icons/si";
import { Modal, Typography, Box, Button } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const loggedIn = localStorage.getItem("loggedIn");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <NavLink onClick={handleOpen}>
              <CiLogout />
            </NavLink>
          </UserWrapper>
        ) : (
          <UserWrapper sx={{ fontSize: "medium" }}>
            <NavLink to={"/login"}>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
            Are you sure?
          </Typography>
          <Box sx={{ display: "flex", gap: "25px", justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
