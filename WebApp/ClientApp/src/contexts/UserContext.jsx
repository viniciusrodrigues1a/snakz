import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasContextMounted, setHasContextMounted] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("/sessions");

      if (response.status === 200) {
        setIsLoggedIn(true);
      }
      setHasContextMounted(true);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, hasContextMounted }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
