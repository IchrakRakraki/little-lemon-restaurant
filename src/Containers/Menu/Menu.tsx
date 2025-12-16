// src/pages/Menu.tsx
import React from "react";
import styled from "styled-components";
import greekSalad from "../assets/greekSalad.jpg";
import bruschetta from "../assets/bruschetta.jpg";
import lemonDessert from "../assets/lemonDessert.jpg";
import { media } from "../../styles/Theme";
import { weekSpecials } from "../../dummyData";
import { ColumnGrid } from "../../styles/StyledComponents";

// Full Menu Data
const menuData = {
  appetizers: [
    {
      name: "Caprese Salad",
      price: "$7",
      description: "Tomatoes, mozzarella, fresh basil, balsamic glaze.",
    },
    {
      name: "Stuffed Mushrooms",
      price: "$8",
      description: "Mushrooms filled with cheese and herbs.",
    },
    { name: "Garlic Bread", price: "$5", description: "Crispy bread with garlic butter." },
  ],
  mains: [
    { name: "Grilled Salmon", price: "$18", description: "Fresh salmon with lemon butter sauce." },
    { name: "Pasta Primavera", price: "$15", description: "Seasonal vegetables with penne pasta." },
    {
      name: "Chicken Marsala",
      price: "$17",
      description: "Sautéed chicken with mushrooms and Marsala wine.",
    },
  ],
  desserts: [
    {
      name: "Tiramisu",
      price: "$7",
      description: "Classic Italian dessert with coffee and mascarpone.",
    },
    {
      name: "Chocolate Lava Cake",
      price: "$8",
      description: "Warm chocolate cake with molten center.",
    },
    { name: "Panna Cotta", price: "$6", description: "Creamy vanilla dessert with berry coulis." },
  ],
  beverages: [
    { name: "Lemonade", price: "$3", description: "Freshly squeezed lemons." },
    { name: "Red Wine", price: "$6", description: "House-selected wine." },
    { name: "Iced Tea", price: "$3", description: "Refreshing black iced tea with lemon." },
  ],
};

// Styled Components

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.color.primary.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

  &:last-child {
    border-bottom: none;
  }

  ${media.md`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

const SpecialCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.highlight.light};

  img {
    width: 100%;
    object-fit: cover;
    height: 200px;
  }

  div {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const SpecialTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.mdPlus};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 0.5rem;
`;

const SpecialPrice = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primary.dark};
`;

// Component
const Menu: React.FC = () => {
  return (
    <>
      {/* <Section>
        <SectionTitle>Week Specials</SectionTitle>
        
        {weekSpecials.map(special => (
          <SpecialCard key={special.id}>
            <img src={special.imgSrc} alt={special.altText} />
            <div>
              <SpecialTitle>{special.title}</SpecialTitle>
              <ItemDescription>{special.description}</ItemDescription>
              <SpecialPrice>${special.price.toFixed(2)}</SpecialPrice>
            </div>
          </SpecialCard>
        ))}
      </Section> */}
      <ColumnGrid>
        <Section>
          <SectionTitle>Appetizers</SectionTitle>
          <ItemList>
            {menuData.appetizers.map(item => (
              <Item key={item.name}>
                <div>
                  <ItemName>{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                </div>
                <ItemPrice>{item.price}</ItemPrice>
              </Item>
            ))}
          </ItemList>
        </Section>

        <Section>
          <SectionTitle>Main Courses</SectionTitle>
          <ItemList>
            {menuData.mains.map(item => (
              <Item key={item.name}>
                <div>
                  <ItemName>{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                </div>
                <ItemPrice>{item.price}</ItemPrice>
              </Item>
            ))}
          </ItemList>
        </Section>

        <Section>
          <SectionTitle>Desserts</SectionTitle>
          <ItemList>
            {menuData.desserts.map(item => (
              <Item key={item.name}>
                <div>
                  <ItemName>{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                </div>
                <ItemPrice>{item.price}</ItemPrice>
              </Item>
            ))}
          </ItemList>
        </Section>

        <Section>
          <SectionTitle>Beverages</SectionTitle>
          <ItemList>
            {menuData.beverages.map(item => (
              <Item key={item.name}>
                <div>
                  <ItemName>{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                </div>
                <ItemPrice>{item.price}</ItemPrice>
              </Item>
            ))}
          </ItemList>
        </Section>
      </ColumnGrid>
    </>
  );
};

export default Menu;
