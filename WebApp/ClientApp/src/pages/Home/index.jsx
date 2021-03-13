import React from "react";

import {
  Container,
  BackgroundOverlay,
  Content,
  Introduction,
  Description,
} from "./styles";

function Home() {
  return (
    <Container>
      <BackgroundOverlay>
        <Content>
          <Introduction>
            Hambúrguer para{" "}
            <div>
              <strong>todo mundo!</strong>
            </div>
          </Introduction>
          <Description>
            Venha lanchar na melhor lanchonete da cidade!
          </Description>
        </Content>
      </BackgroundOverlay>
    </Container>
  );
}

export default Home;
