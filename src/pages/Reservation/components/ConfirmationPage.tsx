import styled from "styled-components";
import { ColumnGrid } from "../../../styles/StyledComponents";
import { media } from "../../../styles/Theme";
const Container = styled.section`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  margin: ${({ theme }) => theme.spacing.lg} 0;
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
const ConfirmationPage = () => {
  return (
    <ColumnGrid>
      <Container id="confirmationPage">
        <h1>Thank you! </h1>
        <p>Your reservation has been successfully booked!</p>
      </Container>
    </ColumnGrid>
  );
};

export default ConfirmationPage;
