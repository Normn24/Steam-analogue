import styled from '@emotion/styled';
import { NavLink } from "react-router-dom";

export const StyledFooter = styled.footer`
    width: 100%;
    height: 232px;
    background-color: #F0F0F4;
    display: flex;
    justify-content: center;
    gap: 40px;
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const StyledTitle = styled.p`
    color: #2f3035;
    font-family: "Gill Sans", sans-serif;
    font-size: 24px;
    font-weight: 700;
`

export const StyledNavLink = styled(NavLink)`
    color: #2f3035;
    text-decoration: none;
    font-family: "Gill Sans", sans-serif;
    font-size: 20px;
    font-weight: 500;
`