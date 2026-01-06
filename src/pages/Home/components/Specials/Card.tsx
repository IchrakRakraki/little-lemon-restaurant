import { type FC } from "react";
import styled from "styled-components";
import { media } from "../../../../styles/Theme";
import delivery from "../../../../assets/icons/delivery.svg";

const MenuItem = styled.article`
  width: 100%;
  border-radius: ${({ theme }) => `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`};
  background-color: ${({ theme }) => theme.color.highlight.light};
`;
const Thumbnail = styled.img`
  border-radius: ${({ theme }) => `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`};
  width: 100%;
  height: 180px;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  align-items: baseline;
`;
const Price = styled.span`
  color: ${({ theme }) => theme.color.secondary.dark};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-rows: 1.5rem auto 1fr;
  ${media.md`
  grid-template-rows: 1.5rem 10rem 1fr;
  `}
`;
const DeliveryButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: start;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.color.highlight.dark};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.primary.dark};
  }
`;

const Icon = styled.img`
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

type CardProps = {
  title: string;
  price: number;
  description: string;
  imgSrc: string;
  altText: string;
};

const Card: FC<CardProps> = ({ title, price, description, imgSrc, altText }) => {
  return (
    <MenuItem>
      <Thumbnail src={imgSrc} alt={altText} />
      <CardContent>
        <CardHeader>
          <h3>{title}</h3>
          <Price>${price}</Price>
        </CardHeader>
        <p>{description}</p>
        <DeliveryButton>
          Order a delivery <Icon src={delivery} alt="delivery icon" />
        </DeliveryButton>
      </CardContent>
    </MenuItem>
  );
};

export default Card;
