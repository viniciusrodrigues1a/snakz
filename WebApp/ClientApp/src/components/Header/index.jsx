import React, { useState, useEffect } from "react";
import { IoBagHandleOutline, IoMenuOutline } from "react-icons/io5";
import { Link, useLocation, useHistory } from "react-router-dom";

import {
  Container,
  NavContainer,
  Nav,
  NavItem,
  NavItemBag,
  DropdownButton,
} from "./styles";

import logoImg from "../../assets/images/logo.png";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      setIsNavOpen(false);
    });
  }, [history]);

  function toggleNavOpenState() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <Container>
      <img src={logoImg} alt="Snakz" />

      <NavContainer isShown={isNavOpen}>
        <Nav>
          {pathname === "/" ? (
            <>
              <NavItem>
                <a href="#menu">Cardápio</a>
              </NavItem>
              <NavItem>
                <a href="#footer">Contato</a>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <Link to="/">Início</Link>
            </NavItem>
          )}

          {pathname !== "/sacola" && (
            <NavItemBag>
              <Link to="/sacola">
                <IoBagHandleOutline size={28} />
                <strong>Sacola</strong>
              </Link>
            </NavItemBag>
          )}
        </Nav>
      </NavContainer>

      <DropdownButton onClick={toggleNavOpenState}>
        <IoMenuOutline color="#fff" size={48} />
      </DropdownButton>
    </Container>
  );
}

export default Header;
