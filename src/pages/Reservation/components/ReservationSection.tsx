import type { ChangeEvent, FocusEvent } from "react";
import styled from "styled-components";
import {
  Container,
  FlexContainer,
  Subtitle,
  type DateType,
  type ErrorType,
  type Reservation,
  type TimesAction,
  type Touched,
} from "../Reservation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { media } from "../../../styles/Theme";
import { useEffect, useRef, type Dispatch, type FC, type SetStateAction } from "react";
import { minMaxDiners } from "../../../utils/constants";
import { ErrorMessage } from "../../../styles/StyledComponents";
import { occasionOptions } from "../../../utils/dummyData";

const ReservationDetails = styled.div`
  ${({ theme }) => media.md`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: ${theme.spacing.xl}
  `}
`;

const CustomCalendar = styled(Calendar)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: none;
  font-family: ${({ theme }) => theme.font.primary};
  text-decoration: none;
  button:enabled {
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
  button:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.color.mutedText};
    opacity: 0.5;
  }
  .react-calendar__navigation button {
    color: ${({ theme }) => theme.color.primary.dark};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  .react-calendar__navigation__label {
    pointer-events: none;
    cursor: default;
  }
  button.react-calendar__navigation__arrow {
    font-size: ${({ theme }) => theme.fontSize.mdPlus};
  }
  abbr {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary.dark};
  }
  .react-calendar__tile {
    transition: background-color 0.2s;
    abbr {
      color: ${({ theme }) => theme.color.primary.dark};
    }
    &:hover {
      background-color: ${({ theme }) => theme.color.highlight.light};
    }
    &:focus,
    :focus-visible {
      background-color: ${({ theme }) => theme.color.primary.dark};
      abbr {
        color: ${({ theme }) => theme.color.background};
      }
    }
  }
  .react-calendar__tile--now {
    background-color: ${({ theme }) => theme.color.highlight.light};
  }
  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.color.primary.light};
    &:focus,
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.color.primary.dark};

      background-color: ${({ theme }) => theme.color.primary.light};
      abbr {
        color: ${({ theme }) => theme.color.primary.dark};
      }
    }
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.lg};
  & > div {
    align-self: start;
    justify-self: start;
    width: 100%;
  }
`;
// const TimePicker = styled.input`
//   border: 2px solid ${({ theme }) => theme.color.primary.dark};
//   padding: ${({ theme }) => theme.spacing.sm};
//   border-radius: ${({ theme }) => theme.borderRadius.sm};
//   outline: none;
//   justify-self: end;
//   transition: background-color 0.2s outline 0.2s;
//   &:active {
//     background-color: ${({ theme }) => theme.color.highlight.light};
//   }
//   &:focus,
//   &:focus-visible {
//     outline: 4px solid ${({ theme }) => theme.color.highlight.light};
//   }
// `;

const CounterIcon = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary.dark};
  border-radius: 50%;
  padding: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: 2px solid ${({ theme }) => theme.color.primary.dark};
  outline: none;
  transition: background-color 0.4s outline 0.2s;
  &:enabled:hover {
    background-color: ${({ theme }) => theme.color.highlight.light};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.highlight.light};
    transform: scale(0.95);
  }
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.highlight.light};
  }
  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    color: ${({ theme }) => theme.color.highlight.light};
    border: 2px solid ${({ theme }) => theme.color.highlight.light};
  }
`;

const NumberDiners = styled.input<{ $error: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: textfield;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid
    ${({ theme, $error }) => ($error ? theme.color.error : theme.color.primary.dark)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: 6ch;
  text-align: center;
  outline: none;
  transition: all 0.2s;
  &:focus,
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.highlight.light};
  }
`;
const CustomRadioInput = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${({ theme }) => theme.color.primary.dark};
  cursor: pointer;
`;
const SelectField = styled.select<{ $error?: boolean }>`
  border: 2px solid
    ${({ theme, $error }) => ($error ? theme.color.error : theme.color.primary.dark)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text};
  font-family: ${({ theme }) => theme.font.secondary};
  font-size: ${({ theme }) => theme.fontSize.mdPlus};
  cursor: pointer;
  outline: none;
  flex-basis: 30%;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.highlight.light};
  }

  &:focus,
  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.color.highlight.light};
  }

  option {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const RequiredLabel = styled.h3`
  position: relative;
  &::after {
    content: "*";
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.error};
  }
`;

type ReservationSectionProps = {
  reservation: Reservation;
  currentDate: Date;
  setReservation: Dispatch<SetStateAction<Reservation>>;
  availableTimes: string[];
  dispatchTimes: Dispatch<TimesAction>;
  errors: ErrorType;
  touched: Touched;
  setTouched: Dispatch<SetStateAction<Touched>>;
};
const ReservationSection: FC<ReservationSectionProps> = ({
  reservation,
  currentDate,
  setReservation,
  availableTimes,
  dispatchTimes,
  errors,
  touched,
  setTouched,
}) => {
  const timeInputRef = useRef<HTMLSelectElement>(null);
  const { date, time, dinersCount, isSeatingIndoor, occasion } = reservation;

  const maxReservationDate = new Date();
  maxReservationDate.setDate(currentDate.getDate() + 30);

  const handleDateChange = (value: DateType) => {
    if (Array.isArray(value)) return;
    setReservation(prev => ({ ...prev, date: value }));
    dispatchTimes({ type: "UPDATE_TIMES", date: value });
    console.log(timeInputRef.current);
    timeInputRef.current?.focus();
  };
  useEffect(() => {
    // Remove month label from keyboard navigation
    const calendarLabelBtn = document.querySelector(".react-calendar__navigation__label");
    if (calendarLabelBtn) calendarLabelBtn.setAttribute("tabindex", "-1");
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectBlur = (event: FocusEvent<HTMLSelectElement>) => {
    const { name } = event.target as { name: keyof Touched };
    setTouched(prev => (!prev[name] ? { ...prev, [name]: true } : prev));
  };
  const handleDinerCountChange = (key: "increase" | "decrease" | "update", value?: number) => {
    if (key) setTouched(prev => (!prev.dinersCount ? { ...prev, dinersCount: true } : prev));
    switch (key) {
      case "decrease":
        setReservation(prev => ({ ...prev, dinersCount: prev.dinersCount - 1 }));
        break;
      case "update":
        if (value !== undefined) setReservation(prev => ({ ...prev, dinersCount: value }));
        break;
      case "increase":
        setReservation(prev => ({ ...prev, dinersCount: prev.dinersCount + 1 }));
        break;
      default:
        break;
    }
  };

  return (
    <section id="bookingRsvDetails" aria-labelledby="reservation-details">
      <Subtitle id="reservation-details">Step 1/2 - Reservation details</Subtitle>
      <ReservationDetails>
        <Container aria-labelledby="res-date">
          <RequiredLabel id="res-date">Select date</RequiredLabel>
          <CustomCalendar
            prev2Label={null}
            next2Label={null}
            minDate={currentDate}
            maxDate={maxReservationDate}
            view="month"
            value={date}
            onChange={handleDateChange}
          />
        </Container>
        <GridContainer>
          <FlexContainer $justifyChildEnd $isRelative>
            <label htmlFor="res-time">
              <RequiredLabel>Select time</RequiredLabel>
            </label>
            {errors.time !== "" && <ErrorMessage>{errors.time}</ErrorMessage>}
            <SelectField
              id="res-time"
              name="time"
              onChange={handleSelectChange}
              onBlur={handleSelectBlur}
              onFocus={handleSelectBlur}
              value={time}
              $error={errors.time !== "" && touched.time}
              ref={timeInputRef}
            >
              {availableTimes.length > 0 &&
                availableTimes.map(timeSlot => (
                  <option key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
            </SelectField>
          </FlexContainer>

          <FlexContainer aria-labelledby="res-guests" $justifyChildEnd $isRelative>
            <RequiredLabel id="res-guests">Select number of diners</RequiredLabel>
            {errors.dinersCount !== "" && touched.dinersCount && (
              <ErrorMessage>{errors.dinersCount}</ErrorMessage>
            )}
            <FlexContainer>
              <CounterIcon
                type="button"
                disabled={dinersCount <= minMaxDiners.min}
                aria-label="Reduce diners"
                onClick={() => handleDinerCountChange("decrease")}
              >
                <FontAwesomeIcon icon={faMinus} />
              </CounterIcon>
              <NumberDiners
                type="number"
                name="dinersCount"
                min={minMaxDiners.min}
                max={minMaxDiners.max}
                step="1"
                value={dinersCount}
                onChange={e => handleDinerCountChange("update", Number(e.target.value))}
                $error={errors.dinersCount !== "" && touched.dinersCount}
              />
              <CounterIcon
                type="button"
                disabled={dinersCount >= minMaxDiners.max}
                aria-label="Increase diners"
                onClick={() => handleDinerCountChange("increase")}
              >
                <FontAwesomeIcon icon={faPlus} />
              </CounterIcon>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer aria-labelledby="seating-area-label" $justifyChildEnd>
            <RequiredLabel id="seating-area-label">Select seating area</RequiredLabel>
            <FlexContainer>
              <FlexContainer $type="radio">
                <CustomRadioInput
                  type="radio"
                  name="seating"
                  id="indoor"
                  checked={isSeatingIndoor}
                  onChange={() => setReservation(prev => ({ ...prev, isSeatingIndoor: true }))}
                />
                <label htmlFor="indoor"> Indoor</label>
              </FlexContainer>

              <FlexContainer $type="radio">
                <CustomRadioInput
                  type="radio"
                  name="seating"
                  id="outdoor"
                  checked={!isSeatingIndoor}
                  onChange={() => setReservation(prev => ({ ...prev, isSeatingIndoor: false }))}
                />
                <label htmlFor="outdoor">Outdoor</label>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer $isRelative>
            <label htmlFor="occasion">
              <RequiredLabel>Select occasion</RequiredLabel>
            </label>
            {touched.occasion && errors.occasion !== "" && (
              <ErrorMessage>{errors.occasion}</ErrorMessage>
            )}
            <SelectField
              id="occasion"
              name="occasion"
              value={occasion}
              onChange={handleSelectChange}
              onBlur={handleSelectBlur}
              onFocus={handleSelectBlur}
              $error={touched.occasion && errors.occasion !== ""}
            >
              {occasionOptions.length > 0 &&
                occasionOptions.map(occasionOption => (
                  <option key={occasionOption} value={occasionOption}>
                    {occasionOption}
                  </option>
                ))}
            </SelectField>
          </FlexContainer>
        </GridContainer>
      </ReservationDetails>
    </section>
  );
};

export default ReservationSection;
