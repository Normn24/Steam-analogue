import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { CiUser, CiViewList, CiShoppingBasket, CiStar } from "react-icons/ci";
import {
  UserPageContainer,
  UserNav,
  UserInfo,
  UserItem,
  NavText,
  NavLinkStyled,
  ContentArea,
} from "./UserStyles";
import { Typography, Box } from "@mui/material";

const UserLayout = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
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
              <CiUser /> My Profile
            </NavText>
          </NavLinkStyled>
          <NavLinkStyled to="/account/orders">
            <NavText>
              <CiShoppingBasket /> My Orders
            </NavText>
          </NavLinkStyled>
          <NavLinkStyled to="/account/wishlist">
            <NavText>
              <CiViewList /> Wishlist
            </NavText>
          </NavLinkStyled>
          <NavLinkStyled to="/account/reviews">
            <NavText>
              <CiStar /> My Reviews
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
