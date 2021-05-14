import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import logoImg from "../../assets/images/logo.png";

function Header() {
  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logoImg} alt="Snakz" />
        </Link>

        <a href="/">Início</a>
      </div>
    </Container>
  );
}

export default Header;
