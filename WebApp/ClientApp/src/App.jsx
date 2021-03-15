import React from "react";
import GlobalStyles from "./styles";
import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

import ScrollIntoView from "./components/ScrollIntoView";

function App() {
  return (
    <>
      <GlobalStyles />
      <ScrollIntoView scrollToId="top">
        <Header />
        <Routes />
        <Footer />
      </ScrollIntoView>
    </>
  );
}

export default App;
