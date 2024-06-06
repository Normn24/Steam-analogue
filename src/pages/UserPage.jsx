import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { fetchUserComments } from "../redux/comments.slice/comments.slice";
import {
  UserPageContainer,
  UserNav,
  UserInfo,
  UserItem,
  NavText,
  NavLinkStyled,
  ContentArea,
} from "../components/UserLayout/UserStyles";
import { SiYoutubegaming } from "react-icons/si";
import { FaUserAstronaut } from "react-icons/fa6";
import { GiDiceFire } from "react-icons/gi";
import { BiSolidGame } from "react-icons/bi";

const UserLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user._id) dispatch(fetchUserComments(user?._id));
  });

  return (
    <UserPageContainer>
      <UserNav>
        <UserInfo>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Typography variant="h6">{user.firstName}</Typography>
            <Typography variant="h6">{user.lastName}</Typography>
          </Box>
          <Typography variant="p" sx={{ color: "#565656" }}>
            {user.email}
          </Typography>
        </UserInfo>
        <UserItem>
          <NavLinkStyled to="/account/profile">
            <NavText>
              <FaUserAstronaut /> My Profile
            </NavText>
          </NavLinkStyled>
          <NavLinkStyled to="/account/orders">
            <NavText>
              <GiDiceFire /> My Orders
            </NavText>
          </NavLinkStyled>
          <NavLinkStyled to="/account/wishlist">
            <NavText>
              <SiYoutubegaming /> My Wishlist
            </NavText>
          </NavLinkStyled>
          <NavLinkStyled to="/account/reviews">
            <NavText>
              <BiSolidGame /> My Reviews
            </NavText>
          </NavLinkStyled>
        </UserItem>
      </UserNav>
      <ContentArea>
        <Outlet />
      </ContentArea>
    </UserPageContainer>
  );
};

export default UserLayout;
