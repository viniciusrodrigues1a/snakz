import React from "react";
import { IoAdd, IoRemove, IoBagAddOutline } from "react-icons/io5";

import UnderlinedTitle from "../../components/UnderlinedTitle";
import ScrollIntoView from "../../components/ScrollIntoView";

import {
  HeroContainer,
  BackgroundOverlay,
  HeroContent,
  HeroIntroduction,
  HeroDescription,
  MenuContainer,
  MenuCardGrid,
  MenuCard,
  MenuCardOptionList,
  MenuCardOption,
  MenuCardOptionBackground,
  MenuCardOptionSelectAmountButton,
  MenuCardAmount,
  MenuCardPrice,
  Bag,
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

      <ScrollIntoView scrollToId="menu">
        <MenuContainer id="menu">
          <UnderlinedTitle>Cardápio</UnderlinedTitle>

          <MenuCardGrid>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <MenuCard key={String(index)}>
                <img src="" alt="" />
                <strong>Cheddar Bacon</strong>
                <span>dois hamburgueres, cheddar, alface</span>

                <MenuCardOptionList>
                  <MenuCardOption width="38%">
                    <MenuCardOptionBackground>
                      <MenuCardOptionSelectAmountButton>
                        <IoRemove color="#999" size={26} />
                      </MenuCardOptionSelectAmountButton>

                      <MenuCardAmount>1</MenuCardAmount>

                      <MenuCardOptionSelectAmountButton>
                        <IoAdd color="#999" size={26} />
                      </MenuCardOptionSelectAmountButton>
                    </MenuCardOptionBackground>
                  </MenuCardOption>

                  <MenuCardOption width="38%">
                    <MenuCardOptionBackground>
                      <MenuCardPrice>R$ 16,90</MenuCardPrice>
                    </MenuCardOptionBackground>
                  </MenuCardOption>

                  <MenuCardOption>
                    <Bag>
                      <IoBagAddOutline size={32} color="#ffffff" />
                    </Bag>
                  </MenuCardOption>
                </MenuCardOptionList>
              </MenuCard>
            ))}
          </MenuCardGrid>
        </MenuContainer>
      </ScrollIntoView>
    </>
  );
}

export default Home;
