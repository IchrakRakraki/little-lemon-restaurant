import logoImg from "../assets/Logo.svg";
import hamburgerIcon from "../assets/hamburger_menu.svg";
import basketIcon from "../assets/basket.svg";
import styled from "styled-components";
import { media } from "../styles/Theme";
import { ColumnGrid } from "../styles/StyledComponents";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { navigationLinks } from "../utils/constants";

const StyledNav = styled.header`
  grid-column: 1/-1;
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  ${({ theme }) => media.md`
    display: grid;
    width: 100%;
    grid-template-columns: 148px 1fr;
    grid-gap: ${theme.spacing.lg};
    align-items: center;
    padding: 1rem 0;
  `};
  ${media.lg`
    grid-column: 2/-2;
  `}
  ${media.xl`
    grid-column: 3/-3;
  `}
`;

const MobileIcon = styled.img<{ $isLeftIcon?: boolean }>`
  width: 32px;
  margin: ${({ $isLeftIcon }) => ($isLeftIcon ? "12px 12px 12px 0" : "12px 0 12px 12px")};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.highlight.light};
  }

  &:focus,
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.primary.light};
    outline-offset: ${({ theme }) => theme.spacing.sm};
  }
  ${media.md`
        display: none;
    `};
`;
const MobileMenu = styled.div<{ $isVisible: boolean; $isTransitioning: boolean }>`
  @keyframes slideIn {
    from {
      transform: translateX(-100vw);
    }
    to {
      transform: translateX(100vw);
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(-100vw);
    }
  }
  position: fixed;
  top: 0;
  left: -100vw;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background-color: ${({ theme }) => theme.color.background};
  padding: ${({ theme }) => theme.spacing.lg};
  animation: ${({ $isVisible, $isTransitioning }) =>
      $isVisible ? "slideIn" : $isTransitioning ? "slideOut" : "none"}
    0.7s ease forwards;
  will-change: transform;
  ${media.md`
    display: none;
  `}
`;
const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const ExitIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary.dark};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.color.primary.dark};
  font-size: ${({ theme }) => theme.fontSize.sm};
  &:focus,
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.primary.light};
    outline-offset: ${({ theme }) => theme.spacing.xs};
  }
`;
const MobileNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;
const NavLinks = styled.ul`
  display: none;
  ${media.md`
        display: flex;
        justify-content: space-between;
        justify-self: flex-end;
        align-items: center;
    `}
`;

const NavLink = styled.li`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.md};
  ${({ theme }) => media.md`
    font-size: ${theme.fontSize.sm}
  `}
`;
export const CustomLink = styled.a<{ $smallPadding?: boolean }>`
  position: relative;
  display: inline-block;
  padding: ${({ theme, $smallPadding }) => ($smallPadding ? theme.spacing.sm : theme.spacing.md)};
  transition: color 0.2s ease;
  &::after {
    content: "";
    position: absolute;
    left: ${({ theme, $smallPadding }) => ($smallPadding ? theme.spacing.sm : theme.spacing.md)};
    bottom: 4px;
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.color.primary.dark};
    transition: width 0.25s ease;
  }
  &:hover {
    &::after {
      width: calc(100% - ${({ $smallPadding }) => ($smallPadding ? "16px" : "32px")});
    }
  }
`;

const LogoLink = styled.a`
  &:focus,
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.primary.light};
  }
`;

const Logo = () => (
  <LogoLink href="/" aria-label="Navigate to Homepage">
    <img src={logoImg} alt="Little Lemon restautant logo." />
  </LogoLink>
);
const Header = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const handleCloseMenu = () => {
    setIsTransitioning(true);
    const t = setTimeout(() => {
      setIsMobileMenuVisible(false);
    }, 450); // match animation duration
    return () => {
      clearTimeout(t);
      setIsTransitioning(false);
    };
  };
  return (
    <ColumnGrid>
      <StyledNav>
        <MobileIcon
          role="button"
          aria-label="Open navigation menu"
          onClick={() => setIsMobileMenuVisible(true)}
          src={hamburgerIcon}
          alt="Hamberger menu icon."
          tabIndex={0}
          $isLeftIcon
        />
        {(isTransitioning || isMobileMenuVisible) && (
          <MobileMenu $isVisible={isMobileMenuVisible} $isTransitioning={isTransitioning}>
            <MobileMenuHeader>
              <Logo />
              <ExitIcon
                tabIndex={0}
                icon={faX}
                role="button"
                aria-label="Close navigation menu"
                onClick={handleCloseMenu}
              />
            </MobileMenuHeader>
            <nav>
              <MobileNavLinks>
                {navigationLinks.map(linkObj => (
                  <NavLink key={linkObj.label}>
                    <CustomLink href={linkObj.link} onClick={handleCloseMenu}>
                      {linkObj.label}
                    </CustomLink>
                  </NavLink>
                ))}
              </MobileNavLinks>
            </nav>
          </MobileMenu>
        )}
        <Logo />
        <MobileIcon
          src={basketIcon}
          alt="Basket icon."
          tabIndex={0}
          role="button"
          aria-label="Open basket"
        />
        <nav>
          <NavLinks>
            {navigationLinks.map(linkObj => (
              <NavLink key={linkObj.label}>
                <CustomLink href={linkObj.link}>{linkObj.label}</CustomLink>
              </NavLink>
            ))}
          </NavLinks>
        </nav>
      </StyledNav>
    </ColumnGrid>
  );
};
export default Header;
