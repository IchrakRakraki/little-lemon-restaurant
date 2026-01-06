import { useCallback, useEffect, useState } from "react";
import type {
  Contact,
  Reservation,
  ErrorType,
  Touched,
} from "../pages/Reservation/components/Reservation";
import {
  dinersErrorMsg,
  emailErrorMsg,
  firstNameErrorMsg,
  lastNameErrorMsg,
  minMaxDiners,
  occasionErrorMsg,
  timeErrorMsg,
} from "../utils/constants";

export const useFormValidation = (reservation: Reservation, contact: Contact, touched: Touched) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<ErrorType>({
    time: "",
    dinersCount: "",
    occasion: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const { time, dinersCount, occasion } = reservation;

  const { firstName, lastName, email } = contact;

  const validateForm = useCallback(() => {
    const newErrors: ErrorType = {
      time: "",
      dinersCount: "",
      occasion: "",
      firstName: "",
      lastName: "",
      email: "",
    };

    if (touched.time && !time.trim()) newErrors.time = timeErrorMsg;
    if (touched.dinersCount) {
      if (dinersCount < minMaxDiners.min) newErrors.dinersCount = dinersErrorMsg.min;
      else if (dinersCount > minMaxDiners.max) newErrors.dinersCount = dinersErrorMsg.max;
    }
    if (touched.occasion && !occasion.trim()) newErrors.occasion = occasionErrorMsg;

    if (!firstName.trim() && touched.firstName) newErrors.firstName = firstNameErrorMsg;
    if (!lastName.trim() && touched.lastName) newErrors.lastName = lastNameErrorMsg;
    if (touched.email) {
      if (!email.trim()) newErrors.email = emailErrorMsg.required;
      else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = emailErrorMsg.invalid;
    }

    setErrors({ ...newErrors });

    const isBtnDisabled =
      Object.values(newErrors).some(msg => msg !== "") ||
      !time.trim() ||
      dinersCount < minMaxDiners.min ||
      dinersCount > minMaxDiners.max ||
      !occasion.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !/^\S+@\S+\.\S+$/.test(email);

    setIsSubmitDisabled(isBtnDisabled);
  }, [time, dinersCount, occasion, firstName, lastName, email, touched]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);
  return { isSubmitDisabled: isSubmitDisabled, errors: errors };
};
