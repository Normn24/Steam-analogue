import { HeaderWrapper, UserWrapper } from "./HeaderStyle";
import { NavLink } from "react-router-dom";
import { CiShoppingBasket } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

export default function Header() {
  return (
    <>
      <HeaderWrapper>
        <NavLink to={"/"}>
          <img
            style={{ width: "30px", height: "30px" }}
            src="/src/img/icons8-game-controller-50.svg"
            alt=""
          />
        </NavLink>
        <UserWrapper>
          <NavLink to={'/cart'}>
            <CiShoppingBasket style={{ width: "30px", height: "30px" }} />
          </NavLink>
          <NavLink>
            <CiUser style={{ width: "30px", height: "30px" }} />
          </NavLink>
        </UserWrapper>
      </HeaderWrapper>
    </>
  );
}
