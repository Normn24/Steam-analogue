import { StyledFooter, StyledNavLink, StyledTitle, InfoWrapper } from "./FooterStyle";
export default function Footer() {
    return (
        <StyledFooter>
            <InfoWrapper>
                <StyledTitle variant="h6">
                    Інформація
                </StyledTitle>
                <StyledNavLink href="#">
                    INFO
                </StyledNavLink>
            </InfoWrapper>
            <InfoWrapper>
                <StyledTitle variant="h6">
                    Інформація
                </StyledTitle>
                <StyledNavLink href="#">
                    INFO
                </StyledNavLink>
            </InfoWrapper>
        </StyledFooter>
    );
}