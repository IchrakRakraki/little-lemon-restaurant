// © 2025 Ichrak Rakraki
// This project is my original work submitted for Meta Coursera Front-End Capstone.
// Not allowed for reuse or resubmission.

import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Reservation from "../pages/Reservation/Reservation";
import ConfirmationPage from "../pages/Reservation/components/ConfirmationPage";
import Menu from "../pages/Menu/Menu";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<Reservation />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/confirmation" element={<ConfirmationPage />}></Route>
      </Routes>
    </main>
  );
};
export default Main;
