import React, { useState, useEffect } from "react";
import {
  IoAdd,
  IoRemove,
  IoBagAddOutline,
  IoFastFoodOutline,
  IoSadOutline
} from "react-icons/io5";

import UnderlinedTitle from "../../components/UnderlinedTitle";
import ScrollIntoView from "../../components/ScrollIntoView";
import LoadingSpin from "../../components/LoadingSpin";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  HeroContainer,
  BackgroundOverlay,
  HeroContent,
  HeroIntroduction,
  HeroDescription,
  MenuContainer,
  MenuEmpty,
  MenuEmptyIcon,
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
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchProducts();
      setLoaded(true);
    })();
  }, []);

  async function fetchProducts() {
    const response = await fetch("/products").then(res => res.json());
    setProducts(response);
  }

  function imageFallback(e) {
    e.target.src = burgerFallbackImg;
  }

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

          { !loaded ? <LoadingSpin /> : (loaded && products.length == 0) ? (
            <MenuEmpty>
              <MenuEmptyIcon>
                <IoFastFoodOutline color="#bbb" size={116} /> 
              </MenuEmptyIcon>

              <strong>
                Não há nada aqui <IoSadOutline color="#555" size={28} />
              </strong>
            </MenuEmpty>
          ) : (
            <MenuCardGrid>
              {products.map((product, index) => (
                <MenuCard key={String(index)}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    onError={imageFallback}
                  />
                  <strong>{product.title}</strong>
                  <span>{product.description}</span>

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
                        <MenuCardPrice>R$ {product.price}</MenuCardPrice>
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
          ) }
        </MenuContainer>
      </ScrollIntoView>
    </>
  );
}

export default Home;
