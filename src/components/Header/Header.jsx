import { HeaderWrapper, UserWrapper } from "./HeaderStyle"
import { NavLink } from "react-router-dom";
import { CiShoppingBasket } from "react-icons/ci";
import { CiUser } from "react-icons/ci";


export default function Header(){
    return (
        <>
            <HeaderWrapper>
                <NavLink to={'/'}><img src="/src/img/icons8-game-controller-50.svg" alt="" /></NavLink>
                <UserWrapper>
                    <NavLink>
                        <CiShoppingBasket style={{width: "50px", height: "50px"}} />
                    </NavLink>
                    <NavLink>
                        <CiUser style={{width: "50px", height: "50px"}} />
                    </NavLink>
                </UserWrapper>
            </HeaderWrapper>
        </>
    )
}