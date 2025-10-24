// © 2025 Ichrak Rakraki
// This project is my original work submitted for Meta Coursera Front-End Capstone.
// Not allowed for reuse or resubmission.

import React from "react";
import { ColumnGrid } from "../../styles/StyledComponents";
import tableReservationImage from "../../assets/table-reservation.jpg";
import styled from "styled-components";
import { media } from "../../styles/Theme";
import ReservationSection from "./ReservationSection";
import ContactSection from "./ContactDetails";
import CTAButton from "../../Components/CTAButton";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeTimes, updateTimes } from "../../utils/bookingUtils";
import { useFormValidation } from "../../hooks/useFormValidation";
import { submitAPI } from "../../utils/api";
import { occasionOptions } from "../../dummyData";

const Thumbnail = styled.img`
  width: 100%;
  height: 250px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg} 0 5rem;
  ${media.sm`
    grid-column: 1/-1;
  `}
  ${media.lg`
    grid-column: 2/-2;
  `}
  ${media.xl`
    grid-column: 3/-3;
  `}
  & > button {
    justify-self: center;
    ${media.sm`
        place-self: end;
  `};
  }
`;

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

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.color.primary.dark};
`;

export const Container = styled.div<{ $spacingValue?: "xs" | "lg" }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $spacingValue = "lg" }) => theme.spacing[$spacingValue]};
  position: ${({ $spacingValue = "lg" }) => ($spacingValue === "lg" ? "initial" : "relative")};
  & > span {
    position: absolute;
    top: 100%;
  }
`;

export const FlexContainer = styled.div<{
  $type?: "radio";
  $isRelative?: boolean;
  $justifyChildEnd?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme, $type }) => theme.spacing[$type === "radio" ? "xs" : "sm"]};
  position: ${({ $isRelative }) => ($isRelative ? "relative" : "initial")};
  flex-wrap: wrap;
  & > div:last-child {
    margin-left: ${({ $justifyChildEnd }) => ($justifyChildEnd ? "auto" : 0)};
  }
  & > label {
    cursor: ${({ $type }) => ($type === "radio" ? "pointer" : "initial")};
  }
  & > span {
    position: absolute;
    top: 100%;
  }
`;

type DateProp = Date | null;
export type DateType = DateProp | [DateProp, DateProp];
export type Reservation = {
  date: DateType;
  time: string;
  dinersCount: number;
  isSeatingIndoor: boolean;
  occasion: string;
};
export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
};
export type ErrorType = {
  time: string;
  dinersCount: string;
  occasion: string;
  firstName: string;
  lastName: string;
  email: string;
};
export type Touched = {
  time: boolean;
  dinersCount: boolean;
  occasion: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
};
export type TimesAction = { type: "UPDATE_TIMES"; date: DateType };

const BookingPage = () => {
  const timesReducer = (state: string[], action: TimesAction) => {
    switch (action.type) {
      case "UPDATE_TIMES":
        return updateTimes(action.date);
      default:
        return state;
    }
  };
  const [availableTimes, dispatchTimes] = useReducer(timesReducer, [], initializeTimes);
  const [reservation, setReservation] = useState<Reservation>({
    date: new Date(),
    time: availableTimes.length > 0 ? availableTimes[0] : "",
    dinersCount: 1,
    isSeatingIndoor: true,
    occasion: occasionOptions.length > 0 ? occasionOptions[0] : "",
  });
  const [contact, setContact] = useState<Contact>({ firstName: "", lastName: "", email: "" });
  const [touched, setTouched] = useState<Touched>({
    time: false,
    dinersCount: false,
    occasion: false,
    firstName: false,
    lastName: false,
    email: false,
  });

  const { isSubmitDisabled, errors } = useFormValidation(reservation, contact, touched);
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const isSuccessful = submitAPI({ ...reservation, ...contact });
    if (isSuccessful) navigate("/confirmation");
  };
  return (
    <>
      <Thumbnail src={tableReservationImage} alt="Decorative restaurant table" />
      <ColumnGrid>
        <Title>Reserve a Table</Title>
        <StyledForm>
          <ReservationSection
            reservation={reservation}
            currentDate={new Date()}
            setReservation={setReservation}
            availableTimes={availableTimes}
            dispatchTimes={dispatchTimes}
            errors={errors}
            touched={touched}
            setTouched={setTouched}
          />
          <ContactSection
            contact={contact}
            setContact={setContact}
            errors={errors}
            touched={touched}
            setTouched={setTouched}
          />
          <CTAButton
            buttonText="Submit Reservation"
            type="submit"
            disabled={isSubmitDisabled}
            onClick={handleSubmitForm}
          />
        </StyledForm>
      </ColumnGrid>
    </>
  );
};

export default BookingPage;
