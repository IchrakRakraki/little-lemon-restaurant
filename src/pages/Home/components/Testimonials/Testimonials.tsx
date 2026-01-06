import styled from "styled-components";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../../../utils/dummyData";
import { ColumnGrid } from "../../../../styles/StyledComponents";
import { media } from "../../../../styles/Theme";

const TestimonialsSection = styled.section`
  background-color: ${({ theme }) => theme.color.secondary.light};
`;
const Content = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing.lg};
  ${media.sm`
  grid-template-columns: repeat(2, 1fr);
`}
  ${media.md`
        grid-template-columns: repeat(4, minmax(0, 1fr));
    `}
  ${media.lg`
    grid-column: 2 / 12;
  `}
  ${media.xl`
    grid-column: 3 / span 8;
  `};
`;
const Title = styled.h1`
  grid-column: 1/-1;
  text-align: center;
`;

const Testimonials = () => (
  <TestimonialsSection id="testimonials">
    <ColumnGrid>
      <Content>
        <Title>Testimonials</Title>
        {testimonials.map(user => (
          <TestimonialCard key={user.id} {...user} />
        ))}
      </Content>
    </ColumnGrid>
  </TestimonialsSection>
);
export default Testimonials;
