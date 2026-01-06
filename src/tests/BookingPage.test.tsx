import { fireEvent, render, screen } from "@testing-library/react";
import Reservation from "../pages/Reservation/Reservation";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import { describe, it, expect, vi } from "vitest";
import ContactSection from "../pages/Reservation/components/ContactDetails";
import ReservationSection from "../pages/Reservation/components/ReservationSection";
import { BrowserRouter } from "react-router-dom";
import {
  dinersErrorMsg,
  emailErrorMsg,
  firstNameErrorMsg,
  lastNameErrorMsg,
  occasionErrorMsg,
  timeErrorMsg,
} from "../utils/constants.js";
// import { initializeTimes, updateTimes } from "../utils/bookingUtils";
// import { fetchAPI, submitAPI } from "../utils/api.js";

// describe("BookingPage Component", () => {
//   it("renders the booking page heading", () => {
//     render(
//       <ThemeProvider theme={theme}>
//         <BookingPage />
//       </ThemeProvider>,
//     );
//     const headingElement = screen.getByText("Reserve a Table");
//     expect(headingElement).toBeInTheDocument();
//   });

//   // it("returns the correct state from initializeTimes", () => {
//   //   const result = initializeTimes();
//   //   expect(result).not.toHaveLength(0);
//   // });
//   // it("renders updated times using updateTimes", () => {
//   //   updateTimes(new Date());
//   //   expect().toHaveBeenCalled();
//   // });
// });
const mockSetReservation = vi.fn();
const mockSetTouched = vi.fn();
vi.mock("../utils/dummydata", () => ({
  occasionOptions: ["Birthday", "Anniversary"], // your test options
}));
const mockReservationProps = {
  reservation: {
    date: new Date(),
    time: "",
    dinersCount: 1,
    isSeatingIndoor: true,
    occasion: "",
  },
  currentDate: new Date(),
  setReservation: mockSetReservation,
  availableTimes: ["18:00", "19:00"],
  dispatchTimes: vi.fn(),
  errors: { dinersCount: "", firstName: "", lastName: "", email: "" },
  touched: { dinersCount: false, time: false },
  setTouched: mockSetTouched,
};

describe("Reservation section", () => {
  vi.clearAllMocks();
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <ReservationSection {...mockReservationProps} />
      </ThemeProvider>,
    );
  });

  // Correct attributes
  it("renders time select has correct attributes", () => {
    const timeSelect = screen.getByLabelText("Select time");
    expect(timeSelect.tagName).toBe("SELECT");
    expect(timeSelect).toHaveValue("18:00");
  });

  it("renders diners number input has correct attributes", () => {
    const numberInput = screen.getByRole("spinbutton");
    expect(numberInput).toHaveAttribute("type", "number");
    expect(numberInput).toHaveAttribute("min", "1");
    expect(numberInput).toHaveAttribute("max", "20");
    expect(numberInput).toHaveAttribute("step", "1");
    expect(numberInput).toHaveValue(1);
  });

  it("renders increase and decrease buttons have right attributes", () => {
    const decreaseBtn = screen.getByLabelText("Reduce diners");
    const increaseBtn = screen.getByLabelText("Increase diners");

    expect(decreaseBtn).toHaveAttribute("type", "button");
    expect(increaseBtn).toHaveAttribute("type", "button");
  });

  it("renders radio buttons for seating area have correct attributes", () => {
    const indoorRadio = screen.getByLabelText("Indoor");
    const outdoorRadio = screen.getByLabelText("Outdoor");

    expect(indoorRadio).toHaveAttribute("type", "radio");
    expect(indoorRadio).toHaveAttribute("name", "seating");
    expect(indoorRadio).toHaveAttribute("id", "indoor");

    expect(outdoorRadio).toHaveAttribute("type", "radio");
    expect(outdoorRadio).toHaveAttribute("id", "outdoor");
    expect(outdoorRadio).toHaveAttribute("name", "seating");
  });

  it("renders occasion select field is rendered with correct attributes", () => {
    const occasionSelect = screen.getByLabelText("Select occasion");
    expect(occasionSelect).toHaveAttribute("id", "occasion");
    expect(occasionSelect.tagName).toBe("SELECT");
  });
});
const mockSetContact = vi.fn();

const mockContactProps = {
  contact: { firstName: "yo", lastName: "", email: "" },
  setContact: mockSetContact,
  errors: {
    firstName: "",
    lastName: "",
    email: "",
    dinersCount: "",
  },
  touched: {
    firstName: false,
    lastName: false,
    email: false,
    dinersCount: false,
  },
  setTouched: mockSetTouched,
};

describe("Contact section", () => {
  vi.clearAllMocks();
  // eslint-disable-next-line no-undef
  beforeEach(() =>
    render(
      <ThemeProvider theme={theme}>
        <ContactSection {...mockContactProps} />
      </ThemeProvider>,
    ),
  );

  it("renders text fields have correct attributes ", () => {
    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email Address/i);

    expect(firstNameField).toHaveAttribute("type", "text");
    expect(firstNameField).toHaveAttribute("required");
    expect(lastNameField).toHaveAttribute("type", "text");
    expect(lastNameField).toHaveAttribute("required");

    expect(emailField).toHaveAttribute("type", "email");
    expect(emailField).toHaveAttribute("required");
  });

  it("updates first name value on change", () => {
    const textInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(textInput, { target: { value: "John", name: "firstName" } });
    expect(mockSetContact).toHaveBeenCalled();
  });
  it("updates last name value on change", () => {
    const textInput = screen.getByLabelText(/last name/i);
    fireEvent.change(textInput, { target: { value: "Doe", name: "lastName" } });
    expect(mockSetContact).toHaveBeenCalled();
  });
  it("updates email value on change", () => {
    const textInput = screen.getByLabelText(/email address/i);
    fireEvent.change(textInput, { target: { value: "John@email.com", name: "email" } });
    expect(mockSetContact).toHaveBeenCalled();
  });

  it("calls setTouched on blur", () => {
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.blur(firstNameInput);
    expect(mockSetTouched).toHaveBeenCalled();
  });
});

describe("Booking page validation test", () => {
  vi.clearAllMocks();
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Reservation {...mockReservationProps} {...mockContactProps} />
        </BrowserRouter>
      </ThemeProvider>,
    );
  });

  it("disables submit btn and show error msg when time validation fails", () => {
    const timeSelect = screen.getByLabelText("Select time");
    fireEvent.change(timeSelect, { target: { value: "19:00" } });
    expect(timeSelect).toHaveValue("19:00");
    expect(screen.queryByText(timeErrorMsg)).not.toBeInTheDocument();

    fireEvent.change(timeSelect, { target: { value: "" } });
    fireEvent.blur(timeSelect);
    expect(screen.queryByText(timeErrorMsg)).toBeInTheDocument();

    const sumbitBtn = screen.getByText(/Submit Reservation/i);
    expect(sumbitBtn).toBeDisabled();
  });

  it("disables submit button when diners count validation fails", () => {
    const numberInput = screen.getByRole("spinbutton");

    expect(screen.queryByText(dinersErrorMsg.min)).not.toBeInTheDocument();
    expect(screen.queryByText(dinersErrorMsg.max)).not.toBeInTheDocument();

    fireEvent.change(numberInput, { target: { value: 0, name: "dinersCount" } });
    fireEvent.blur(numberInput);
    expect(screen.queryByText(dinersErrorMsg.min)).toBeInTheDocument();

    fireEvent.change(numberInput, { target: { value: 30, name: "dinersCount" } });
    fireEvent.blur(numberInput);
    expect(screen.queryByText(dinersErrorMsg.max)).toBeInTheDocument();

    const sumbitBtn = screen.getByText(/Submit Reservation/i);
    expect(sumbitBtn).toBeDisabled();

    fireEvent.change(numberInput, { target: { value: 18, name: "dinersCount" } });
    expect(screen.queryByText(dinersErrorMsg.min)).not.toBeInTheDocument();
    expect(screen.queryByText(dinersErrorMsg.max)).not.toBeInTheDocument();
  });

  it("disables submit btn and show error msg when occasion validation fails", () => {
    const occasionSelect = screen.getByLabelText(/Select occasion/i);
    fireEvent.change(occasionSelect, { target: { value: "" } });
    fireEvent.blur(occasionSelect);
    expect(screen.queryByText(occasionErrorMsg)).toBeInTheDocument();

    const sumbitBtn = screen.getByText(/Submit Reservation/i);
    expect(sumbitBtn).toBeDisabled();

    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });
    fireEvent.blur(occasionSelect);
    expect(screen.queryByText(occasionErrorMsg)).not.toBeInTheDocument();
  });

  it("disables submit button and shows error msg when first name validation fails ", () => {
    const textInput = screen.getByLabelText(/first name/i);

    expect(screen.queryByText(firstNameErrorMsg)).not.toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "", name: "firstName" } });
    fireEvent.blur(textInput);
    expect(screen.queryByText(firstNameErrorMsg)).toBeInTheDocument();

    const sumbitBtn = screen.getByText(/Submit Reservation/i);
    expect(sumbitBtn).toBeDisabled();

    fireEvent.change(textInput, { target: { value: "John", name: "firstName" } });
    expect(screen.queryByText(firstNameErrorMsg)).not.toBeInTheDocument();
  });

  it("disables submit button and shows error msg when last name validation fails", () => {
    const textInput = screen.getByLabelText(/last name/i);

    expect(screen.queryByText(lastNameErrorMsg)).not.toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "", name: "lastName" } });
    fireEvent.blur(textInput);
    expect(screen.queryByText(lastNameErrorMsg)).toBeInTheDocument();

    const sumbitBtn = screen.getByText(/Submit Reservation/i);
    expect(sumbitBtn).toBeDisabled();

    fireEvent.change(textInput, { target: { value: "Doe", name: "lastName" } });
    expect(screen.queryByText(lastNameErrorMsg)).not.toBeInTheDocument();
  });

  it("disables submit button and shows error msg when email validation fails", () => {
    const textInput = screen.getByLabelText(/email address/i);

    expect(screen.queryByText(emailErrorMsg.required)).not.toBeInTheDocument();
    expect(screen.queryByText(emailErrorMsg.invalid)).not.toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "", name: "email" } });
    fireEvent.blur(textInput);
    expect(screen.queryByText(emailErrorMsg.required)).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "johnDoe", name: "email" } });
    expect(screen.queryByText(emailErrorMsg.invalid)).toBeInTheDocument();
    expect(screen.queryByText(emailErrorMsg.required)).not.toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "johnDoe@email.com", name: "email" } });
    expect(screen.queryByText(emailErrorMsg.invalid)).not.toBeInTheDocument();
    expect(screen.queryByText(emailErrorMsg.required)).not.toBeInTheDocument();

    const sumbitBtn = screen.getByText(/Submit Reservation/i);
    expect(sumbitBtn).toBeDisabled();
  });

  it("enables subit button when validation succeeds", () => {
    const timeSelect = screen.getByLabelText(/Select time/i);
    const numberInput = screen.getByRole("spinbutton");
    const occasionSelect = screen.getByLabelText(/Select occasion/i);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    const sumbitBtn = screen.getByText(/Submit Reservation/i);

    fireEvent.change(timeSelect, { target: { value: "19:00" } });
    fireEvent.change(numberInput, { target: { value: 18, name: "dinersCount" } });
    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });
    fireEvent.change(firstNameInput, { target: { value: "John", name: "firstName" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe", name: "lastName" } });
    fireEvent.change(emailInput, { target: { value: "johnDoe@email.com", name: "email" } });
    expect(sumbitBtn).toBeEnabled();
  });
});
