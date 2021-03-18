import React from "react";

import { BagProvider } from "./contexts/BagContext";

import GlobalStyles from "./styles";
import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BagProvider>
        <GlobalStyles />
        <Header />
        <Routes />
        <Footer />
      </BagProvider>
    </>
  );
}

export default App;
