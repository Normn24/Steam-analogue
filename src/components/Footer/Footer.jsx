import { StyledFooter, StyledTitle, InfoWrapper, StyledNavLink } from "./FooterStyle";

export default function Footer() {
    return (
        <StyledFooter>
                <InfoWrapper>
                    <StyledTitle>Інформація</StyledTitle>
                    <StyledNavLink>INFO</StyledNavLink>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitle>Інформація</StyledTitle>
                    <StyledNavLink>INFO</StyledNavLink>
                </InfoWrapper>
        </StyledFooter>
    );
}
