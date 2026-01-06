import type { DateType } from "../pages/Reservation/Reservation";
import { fetchAPI } from "./api";

export const initializeTimes = (): string[] => {
  const today = new Date();
  return fetchAPI(today);
};
export const updateTimes = (date: DateType): string[] => {
  return fetchAPI(date);
};
