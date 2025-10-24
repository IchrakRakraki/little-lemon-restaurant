import Main from "./Containers/Main";
import Nav from "./Containers/Nav";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { GlobalStyles } from "./styles/GlobalStyles";
import Footer from "./Containers/Footer";
import { BrowserRouter } from "react-router-dom";

library.add(faStarSolid, faStarRegular);

const StickyPos = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  position: sticky;
  z-index: 1;
  top: 0;
`;

function App() {
  console.log(
    "© Ichrak – This project is original work submitted for the Meta Front-End Developer Capstone.",
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <StickyPos>
          <Nav />
        </StickyPos>
        <Main />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
