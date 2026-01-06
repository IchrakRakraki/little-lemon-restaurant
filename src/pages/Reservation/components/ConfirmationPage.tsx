import styled from "styled-components";
import { ColumnGrid } from "../../../styles/StyledComponents";
import { media } from "../../../styles/Theme";
import { Thumbnail } from "../Reservation";
import tableReservationImage from "../../../assets/images/table_reservation.jpg";

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
      & p {
    max-width: 100%;
  }
`;
const ConfirmationPage = () => {
  return (
    <>
      <Thumbnail src={tableReservationImage} alt="Decorative restaurant table" />
      <ColumnGrid>
        <Container id="confirmationPage">
          <h1>Thank you!</h1>
          <p>Your reservation has been successfully booked!</p>
        </Container>
      </ColumnGrid>
    </>
  );
};

export default ConfirmationPage;
