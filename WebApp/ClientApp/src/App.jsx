import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        pauseOnHover={false}
        closeButton={false}
        newestOnTop
        closeOnClick
        draggable
        limit={3}
      />
    </>
  );
}

export default App;
