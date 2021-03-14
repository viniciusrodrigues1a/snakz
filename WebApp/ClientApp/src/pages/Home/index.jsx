import React from "react";

import {
  HeroContainer,
  BackgroundOverlay,
  HeroContent,
  HeroIntroduction,
  HeroDescription,
} from "./styles";

function Home() {
  return (
    <>
      <HeroContainer>
        <BackgroundOverlay>
          <HeroContent>
            <HeroIntroduction>
              Hambúrguer para{" "}
              <div>
                <strong>todo mundo!</strong>
              </div>
            </HeroIntroduction>
            <HeroDescription>
              Venha lanchar na melhor lanchonete da cidade!
            </HeroDescription>
          </HeroContent>
        </BackgroundOverlay>
      </HeroContainer>
    </>
  );
}

export default Home;
