// src/pages/Menu.tsx
import React from "react";
import styled from "styled-components";
import { media } from "../../styles/Theme";
import { weekSpecials, menuData } from "../../utils/dummyData";
import { ColumnGrid } from "../../styles/StyledComponents";
import Card from "../Home/components/Specials/Card";

const Title = styled.h1`
  padding-top: ${({ theme }) => theme.spacing.xl};
  ${media.sm`
    grid-column: 1/-1;
  `}
  ${media.lg`
    grid-column: 2/-2;
  `}
  ${media.xl`
    grid-column: 3/-3;
  `}
`;

const Section = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const Content = styled.div`
  margin-bottom: 5rem;

  ${media.sm`
    grid-column: 1/-1;
  `}
  ${media.lg`
    grid-column: 2/-2;
  `}
  ${media.xl`
    grid-column: 3/-3;
  `}
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  ${({ theme }) => media.sm`
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${theme.spacing.xl};
  `}
  ${media.md`
    grid-column: 1 / -1;
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.lg`
    grid-column: 2 / 12;
  `}
  ${media.xl`
    grid-column: 3 / span 8;
  `}
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.highlight.light};
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.md};
  &:last-child {
    border-bottom: none;
  }
`;

const ItemLabel = styled.div`
  display: flex;
  flex-direction: column;
  ${media.md`
flex-direction: row;
    align-items: baseline;

  `}
`;
const ItemName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.mdPlus};
`;

const ItemDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.mutedText};
  margin-top: 0.25rem;

  ${media.md`
    margin-top: 0;
    margin-left: 1rem;
  `}
`;

const ItemPrice = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.primary.dark};
  margin-top: 0.25rem;

  ${media.md`
    margin-top: 0;
  `}
`;

const Menu: React.FC = () => {
  return (
    <>
      <ColumnGrid>
        <Content>
          <Title>Little Lemon Menu</Title>
          <Section id="weekSpecials">
            <SectionTitle>Week Specials</SectionTitle>
            <CardsContainer>
              {weekSpecials.map(special => (
                <Card key={special.id} {...special} />
              ))}
            </CardsContainer>
          </Section>
          {menuData.map(category => (
            <Section key={category.id} id={category.name}>
              <SectionTitle>{category.name}</SectionTitle>
              <ItemList>
                {category.entries.map(item => (
                  <Item key={item.name}>
                    <ItemLabel>
                      <ItemName>{item.name}</ItemName>
                      <ItemDescription>{item.description}</ItemDescription>
                    </ItemLabel>
                    <ItemPrice>{item.price}</ItemPrice>
                  </Item>
                ))}
              </ItemList>
            </Section>
          ))}
        </Content>
      </ColumnGrid>
    </>
  );
};

export default Menu;
