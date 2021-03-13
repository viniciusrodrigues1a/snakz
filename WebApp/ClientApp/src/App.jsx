import React from "react";
import GlobalStyles from "./styles";
import Header from "./components/Header";
import Routes from "./routes";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes />
    </>
  );
}

export default App;
