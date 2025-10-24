// © 2025 Ichrak Rakraki
// This project is my original work submitted for Meta Coursera Front-End Capstone.
// Not allowed for reuse or resubmission.

import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import BookingPage from "./BookingPage/BookingPage";
import ConfirmationPage from "./BookingPage/ConfirmationPage";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<BookingPage />}></Route>
        <Route path="/confirmation" element={<ConfirmationPage />}></Route>
      </Routes>
    </main>
  );
};
export default Main;
