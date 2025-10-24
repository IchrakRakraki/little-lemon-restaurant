import styled from "styled-components";
import LargeLogo from "../assets/LargeLogo.png";
import { media } from "../styles/Theme";
import { ColumnGrid } from "../styles/StyledComponents";
import { footerNavigationLinks } from "../utils/constants";
import { CustomLink } from "./Nav";
const Background = styled.div`
  background-color: ${({ theme }) => theme.color.highlight.light};
`;
const CustomFooter = styled.footer`
  grid-column: 1/-1;
  display: grid;
  grid-gap: 20px;
  ${media.sm`
        width: 100%;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    `}
  ${media.md`
        grid-template-columns: repeat(4, minmax(0, 1fr));
    `}
    ${media.lg`
    grid-column: 2/-2;
  `}
  ${media.xl`
    grid-column: 3/-3;
  `}
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.primary.dark};
  margin: ${({ theme }) => `0 0 ${theme.spacing.md} ${theme.spacing.sm}`};
`;
const FooterCategory = styled.div`
  margin-top: 0.5rem;
`;
const LinksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const NavLink = styled.li`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
const Watermark = styled.p`
  text-align: center;
  grid-column: 1/-1;
`;
const Footer = () => {
  return (
    <Background>
      <ColumnGrid>
        <CustomFooter>
          <img src={LargeLogo} alt="Little Lemon restaurant logo" />
          <FooterCategory>
            <Title>Doormat Navigation</Title>
            <LinksContainer>
              {footerNavigationLinks.doormat.map(linkObj => (
                <NavLink key={linkObj.label}>
                  <CustomLink href={linkObj.link} $smallPadding>
                    {linkObj.label}
                  </CustomLink>
                </NavLink>
              ))}
            </LinksContainer>
          </FooterCategory>
          <FooterCategory>
            <Title>Contact</Title>
            <LinksContainer>
              {footerNavigationLinks.contact.map(linkObj => (
                <NavLink key={linkObj.label}>
                  <CustomLink href={linkObj.link} $smallPadding>
                    {linkObj.label}
                  </CustomLink>
                </NavLink>
              ))}
            </LinksContainer>
          </FooterCategory>
          <FooterCategory>
            <Title>Social Media Links</Title>
            <LinksContainer>
              {footerNavigationLinks.social.map(linkObj => (
                <NavLink key={linkObj.label}>
                  <CustomLink href={linkObj.link} $smallPadding>
                    {linkObj.label}
                  </CustomLink>
                </NavLink>
              ))}
            </LinksContainer>
          </FooterCategory>
          <Watermark>© Ichrak Rakraki — Little Lemon Coursera Submission</Watermark>
        </CustomFooter>
      </ColumnGrid>
    </Background>
  );
};
export default Footer;
