import styled from "styled-components";
import heroImage from "../../../assets/images/hero.jpg";
import { media } from "../../../styles/Theme";
import CTAButton from "../../../components/CTAButton";
import { ColumnGrid } from "../../../styles/StyledComponents";
import { useNavigate } from "react-router-dom";

const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.color.primary.dark};
  padding: 1.5rem 0;
`;

const HeroTextContent = styled.div`
  padding-top: ${({ theme }) => theme.spacing.lg};
  margin: auto 0;
  ${media.sm`
      grid-column-start: 1 ;
    `}
  ${media.md`
      grid-column: 1/ 7 ;
  `}
  ${media.lg`
    grid-column: 2 / 7;
  `}
  ${media.xl`
    grid-column: 3 / 7;
  `}
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary.light};
  line-height: 0.8;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.color.highlight.light};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.color.highlight.light};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  ${media.sm`
    grid-column-start: 2;
  `}
  ${media.md`
    grid-column: 7/ -1;
  `}
  ${media.lg`
       grid-column: 7 / -2;
     `}
  ${media.xl`
       grid-column: 7 / -3;
     `}
`;
const HeroImage = styled.img`
  position: absolute;
  width: 100%;
  height: 395px;
  border-radius: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.boxShadow.img};
  top: 10%;
  ${media.md`
    right: 0;
    width: 80%;
  `}
`;

const Hero = () => {
  const navigate = useNavigate();
  return (
    <HeroSection id="hero" className="hero">
      <ColumnGrid>
        <HeroTextContent>
          <Title>Little Lemon</Title>
          <Subtitle>Chicago</Subtitle>
          <Description>
            We are a family owned Mediterranean restaurant focused on traditional recipes served
            with a modern twist.
          </Description>
          <CTAButton buttonText="Reserve a Table" onClick={() => navigate("/booking")} />
        </HeroTextContent>
        <ImageContainer>
          <HeroImage
            src={heroImage}
            alt="Three tomato and basil Bruschettas presented on a black plate"
          />
        </ImageContainer>
      </ColumnGrid>
    </HeroSection>
  );
};
export default Hero;
