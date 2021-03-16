import React from "react";
import GlobalStyles from "./styles";
import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes />
      <Footer />
    </>
  );
}

export default App;
