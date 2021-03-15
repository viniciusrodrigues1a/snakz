import React from "react";
import { useLocation } from "react-router-dom";
import { IoChevronUp, IoLocationOutline, IoCallOutline } from "react-icons/io5";

import ScrollIntoView from "../ScrollIntoView";

import { Container, ScrollUpLink, Info } from "./styles";

function Footer() {
  const { pathname } = useLocation();

  return (
    <ScrollIntoView scrollToId="footer">
      <Container id="footer">
        {pathname === "/" && (
          <ScrollUpLink to="#top">
            <IoChevronUp color="#eeeeee" size={28} />
            <IoChevronUp color="#eeeeee" size={28} />
          </ScrollUpLink>
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
    </ScrollIntoView>
  );
}

export default Footer;
