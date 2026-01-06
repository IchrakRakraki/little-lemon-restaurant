// © 2025 Ichrak Rakraki
// This project is my original work submitted for Meta Coursera Front-End Capstone.
// Not allowed for reuse or resubmission.

import About from "./components/About";
import Hero from "./components/Hero";
import Specials from "./components/Specials/Specials";
import Testimonials from "./components/Testimonials/Testimonials";

const Homepage = () => {
  return (
    <>
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </>
  );
};

export default Homepage;
