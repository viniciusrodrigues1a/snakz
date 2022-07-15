import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";

import { BagProvider } from "./contexts/BagContext";
import { UserProvider } from "./contexts/UserContext";

import GlobalStyles from "./styles";
import Routes from "./routes";
import Footer from "./components/Footer";

function App() {
  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      window.scrollTo(0, 0);
    });
  }, [history]);

  return (
    <>
      <UserProvider>
        <BagProvider>
          <GlobalStyles />
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
