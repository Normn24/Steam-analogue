import { HeaderWrapper, UserWrapper } from "./HeaderStyle";
import { NavLink } from "react-router-dom";
import { CiShoppingBasket } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { SiRepublicofgamers } from "react-icons/si";

export default function Header() {
  return (
    <>
      <HeaderWrapper>
        <NavLink to={"/"}>
          <SiRepublicofgamers style={{ fontSize: "50px" }} />
        </NavLink>
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
        </UserWrapper>
      </HeaderWrapper>
    </>
  );
}
