import {
  InfoWrapper,
  StyledFooter,
  StyledTitle,
} from "../../styles/navbar-footer/FooterStyle";
import { NavLink } from "react-router-dom";
import {
  FaDiscord,
  FaInstagramSquare,
  FaTwitterSquare,
  FaLinkedin,
} from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <StyledFooter>
        <StyledTitle>
          All rights reserved. All trademarks are the property of their
          respective owners in Ukraine and other countries. All prices are
          inclusive of VAT (if applicable)
        </StyledTitle>
        <InfoWrapper>
          <NavLink to="https://discord.com/" target="_blank">
            <FaDiscord />
          </NavLink>
          <NavLink to="https://twitter.com/" target="_blank">
            <FaTwitterSquare />
          </NavLink>
          <NavLink to="https://ua.linkedin.com/" target="_blank">
            <FaLinkedin />
          </NavLink>
          <NavLink to="https://www.instagram.com/" target="_blank">
            <FaInstagramSquare />
          </NavLink>
        </InfoWrapper>
      </StyledFooter>
    </>
  );
}
