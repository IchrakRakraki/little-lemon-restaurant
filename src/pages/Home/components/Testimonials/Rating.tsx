import type { FC, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.primary.dark};
  width: 12px;
  height: 12px;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

type RatingProps = {
  starsCount: number;
};

const Rating: FC<RatingProps> = ({ starsCount }) => {
  let icons: ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    const newIcon = (
      <StyledIcon key={i} icon={i <= starsCount ? ["fas", "star"] : ["far", "star"]} />
    );
    icons = [...icons, newIcon];
  }
  return <div>{icons}</div>;
};

export default Rating;
