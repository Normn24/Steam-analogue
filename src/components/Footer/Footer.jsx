import { InfoWrapper, StyledFooter, StyledTitle } from "./FooterStyle"
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <StyledFooter>
                <StyledTitle>Усі права захищено. Усі торговельні марки є власністю відповідних власників у Україні та інших країнах.Усі ціни вказані з урахуванням ПДВ (за потреби)</StyledTitle>
                <InfoWrapper>
                    <NavLink to="https://discord.com/"><img src="/src/img/discord-svgrepo-com.svg" alt="discord_logo" /></NavLink>
                    <NavLink to="https://twitter.com/"><img src="/src/img/twitter-x.svg" alt="twitter_x" /></NavLink>
                    <NavLink to="https://ua.linkedin.com/"><img src="/src/img/linkedin-svgrepo-com.svg" alt="linkedin" /></NavLink>
                    <NavLink to="https://www.instagram.com/"><img src="/src/img/icons8-instagram.svg" alt="instagram" /></NavLink>
                </InfoWrapper>
            </StyledFooter>
        </>
    );
}