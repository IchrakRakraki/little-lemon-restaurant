import { type FC } from "react";
import styled from "styled-components";
import Rating from "./Rating";

const Testimonial = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.boxShadow.img};
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-gap: ${({ theme }) => theme.spacing.md};
`;

const CardHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;

const FullName = styled.h3`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.fontWeight.medium};
`;

const UserName = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.fontWeight.medium};
`;

const Review = styled.p`
  margin-top: 0;
`;

type TestimonialCardProps = {
  rating: number;
  avatar: string;
  fullName: string;
  userName: string;
  review: string;
};

const TestimonialCard: FC<TestimonialCardProps> = ({
  rating,
  avatar,
  fullName,
  userName,
  review,
}) => {
  return (
    <Testimonial>
      <Rating starsCount={rating} />
      <CardHeader>
        <Avatar className="avatar" src={avatar} alt={`Avatar of ${fullName}`} />
        <div>
          <FullName>{fullName}</FullName>
          <UserName>{userName}</UserName>
        </div>
      </CardHeader>

      <Review>{review}</Review>
    </Testimonial>
  );
};

export default TestimonialCard;
