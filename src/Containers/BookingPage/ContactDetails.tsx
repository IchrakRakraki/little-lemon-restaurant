import styled from "styled-components";
import { Container, Subtitle, type Contact, type ErrorType, type Touched } from "./BookingPage";
import { media } from "../../styles/Theme";
import type { ChangeEvent, FocusEvent, Dispatch, FC, SetStateAction } from "react";
import { ErrorMessage } from "../../styles/StyledComponents";
import { RequiredLabel } from "./ReservationSection";

const ContactDetails = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xl};
  ${media.sm`
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 1fr auto;
  `};
`;
const CustomInput = styled.input<{ $error?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid
    ${({ theme, $error }) => ($error ? theme.color.error : theme.color.primary.dark)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.color.text};
  outline: none;
  transition: all 0.2s;
  &::placeholder {
    color: ${({ theme }) => theme.color.mutedText};
  }
  &:focus,
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.highlight.light};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.highlight.light};
  }
`;

type ContactSectionProps = {
  contact: Contact;
  setContact: Dispatch<SetStateAction<Contact>>;
  errors: ErrorType;
  touched: Touched;
  setTouched: Dispatch<SetStateAction<Touched>>;
};
const ContactSection: FC<ContactSectionProps> = ({
  contact,
  setContact,
  errors,
  touched,
  setTouched,
}) => {
  const { firstName, lastName, email } = contact;
  const handleTextField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target as { name: keyof Touched };
    setTouched(prev => (!prev[name] ? { ...prev, [name]: true } : prev));
  };
  return (
    <section id="bookingContactDetails" aria-labelledby="contact-info">
      <Subtitle>Contact Information</Subtitle>
      <ContactDetails>
        <Container>
          <Container $spacingValue="xs">
            <label htmlFor="firstName">
              <RequiredLabel>First Name</RequiredLabel>
            </label>
            <CustomInput
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleTextField}
              onBlur={handleOnBlur}
              required
              $error={errors.firstName !== "" && touched.firstName}
            />
            {errors.firstName !== "" && touched.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
          </Container>
          <Container $spacingValue="xs">
            <label htmlFor="lastName">
              <RequiredLabel>Last Name</RequiredLabel>
            </label>
            <CustomInput
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleTextField}
              onBlur={handleOnBlur}
              required
              $error={errors.lastName !== "" && touched.lastName}
            />
            {errors.lastName !== "" && touched.lastName && (
              <ErrorMessage>{errors.lastName}</ErrorMessage>
            )}
          </Container>
          <Container $spacingValue="xs">
            <label htmlFor="email">
              <RequiredLabel>Email Address</RequiredLabel>
            </label>
            <CustomInput
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleTextField}
              onBlur={handleOnBlur}
              required
              $error={errors.email !== "" && touched.email}
            />
            {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </Container>
        </Container>
      </ContactDetails>
    </section>
  );
};

export default ContactSection;
