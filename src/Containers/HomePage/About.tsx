import restaurantImage from "../../assets/restaurant.jpg";
import chefsImage from "../../assets/Mario_Adrian_B_cropped.jpg";
import { ColumnGrid } from "../../styles/StyledComponents";
import styled from "styled-components";
import { media } from "../../styles/Theme";

const TextContent = styled.div`
  ${media.sm`
    grid-column: 1/ -1;
    `}
  ${media.md`
    grid-column: 1/6;
    `}
  ${media.lg`
    grid-column: 2/ 7;
    `}
    ${media.xl`
    grid-column: 3/ span 3;
    `}
`;

// TODO: keep one h1 in a page and sections should have h2

const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary.dark};
`;

const Subtitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ThumbnailSection = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  ${media.sm`
    grid-column: 1/-1;
    `}
  ${media.md`
    grid-column: 6 / -1;
    justify-self: end;
    `}
  ${media.lg`
    grid-column: 7 / -2; 
    `}
    ${media.xl`
    grid-column: 7 / -3; 
    `}
`;

const AboutImage = styled.img<{ $bottomImg?: boolean }>`
  width: 250px;
  height: 330px;
  float: right;
  position: ${({ $bottomImg }) => ($bottomImg ? "absolute" : "initial")};
  left: 0;
  top: ${({ $bottomImg }) => ($bottomImg ? "75px" : 0)};
  z-index: ${({ $bottomImg }) => ($bottomImg ? -1 : 0)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.img};
`;

const About = () => (
  <section id="about">
    <ColumnGrid>
      <TextContent>
        <Title>Little Lemon</Title>
        <Subtitle>Chicago</Subtitle>
        <p>
          Welcome to The Little Lemon, a family-owned Mediterranean restaurant where tradition meets
          modern flavor.
        </p>
        <p>
          Founded and lovingly run by chefs Mario and Adrian, we take pride in serving authentic
          recipes passed down through generations, each dish reimagined with a fresh, contemporary
          twist.
        </p>
        <p>
          At The Little Lemon, every meal is crafted with heart, heritage, and a squeeze of
          creativity.
        </p>
      </TextContent>
      <ThumbnailSection>
        <AboutImage
          src={chefsImage}
          alt={
            "Chefs Mario and Adrian in chef outfits smiling happily in the kitchen, looking at plates outside the frame."
          }
        />
        <AboutImage
          src={restaurantImage}
          alt={
            "Well-lit restaurant interior with a terrace and scenic view, featuring a central tree, a light purple sofa with green and blue pillows, bamboo seating with an industrial touch, and chairs with light terracotta leather cushions, alongside tables and a bar area."
          }
          $bottomImg
        />
      </ThumbnailSection>
    </ColumnGrid>
  </section>
);

export default About;
