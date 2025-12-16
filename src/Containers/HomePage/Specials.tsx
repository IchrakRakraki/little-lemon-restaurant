import styled from "styled-components";
import Card from "../../Components/Card";
import { weekSpecials } from "../../dummyData";
import { ColumnGrid } from "../../styles/StyledComponents";
import CTAButton from "../../Components/CTAButton";
import { media } from "../../styles/Theme";
import { useNavigate } from "react-router-dom";

const Content = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  ${({ theme }) => media.sm`
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: inherit;
    grid-gap: ${theme.spacing.xl};
  `}
  ${media.md`
    grid-column: 1 / -1;
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.lg`
    grid-column: 2 / 12;
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.xl`
    grid-column: 3 / span 8;
    grid-template-columns: repeat(3, 1fr);
  `}
`;
const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: ${({ theme }) => theme.spacing.md};
  ${media.md`
    grid-column: 1/4;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `};
`;

const Specials = () => {
  const navigate = useNavigate();
  return (
    <section id="specials">
      <ColumnGrid>
        <Content>
          <SectionHeader>
            <h1>This week's specials!</h1>
            <CTAButton buttonText="Online Menu" onClick={() => navigate("/menu")} />
          </SectionHeader>

          {weekSpecials.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </Content>
      </ColumnGrid>
    </section>
  );
};

export default Specials;
