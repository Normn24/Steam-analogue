import styled from '@emotion/styled';
import { NavLink } from "react-router-dom";

export const NavBarWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #F0F0F4;
    justify-content: center;
`

export const NavBarItem = styled.div`
    width: 200px;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    &:hover{
        border-bottom: 4px solid #1c62cd;
    }
`

export const StyledNavBarLink = styled(NavLink)`
    color: #2f3035;
    text-decoration: none;
    font-family: "Gill Sans", sans-serif;
    font-size: 20px;
    font-weight: 500;
`