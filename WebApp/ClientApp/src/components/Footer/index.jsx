import React from "react";
import { useLocation } from "react-router-dom";
import { IoChevronUp, IoLocationOutline, IoCallOutline } from "react-icons/io5";

import { Container, ScrollUpAnchor, Info } from "./styles";

function Footer() {
  const { pathname } = useLocation();

  return (
    <Container id="footer">
      {pathname === "/" && (
        <ScrollUpAnchor href="#root">
          <IoChevronUp color="#eeeeee" size={28} />
          <IoChevronUp color="#eeeeee" size={28} />
        </ScrollUpAnchor>
      )}

      <Info highlight>
        <IoLocationOutline color="#eeeeee" size={28} />
        <strong>
          Rua Renato Werneck, 1258, Araçatuba, São Paulo, 16050-660
        </strong>
      </Info>

      <Info>
        <IoCallOutline color="#eeeeee" size={28} />
        <span>(18) 5130-4527</span>
      </Info>
    </Container>
  );
}

export default Footer;
