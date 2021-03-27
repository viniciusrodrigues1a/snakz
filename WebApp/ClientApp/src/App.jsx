import React from "react";

import { BagProvider } from "./contexts/BagContext";
import { UserProvider } from "./contexts/UserContext";

import GlobalStyles from "./styles";
import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <UserProvider>
        <BagProvider>
          <GlobalStyles />
          <Header />
          <Routes />
          <Footer />
        </BagProvider>
      </UserProvider>
    </>
  );
}

export default App;
