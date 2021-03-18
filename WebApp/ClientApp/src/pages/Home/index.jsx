import React, { useState, useEffect } from "react";
import {
  IoAdd,
  IoRemove,
  IoBagAddOutline,
  IoFastFoodOutline,
  IoSadOutline,
} from "react-icons/io5";

import formatPrice from "../../utils/formatPrice";

import UnderlinedTitle from "../../components/UnderlinedTitle";
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
    const formattedResponse = response.map(p => ({
      ...p,
      amount: 1,
      formattedPrice: formatPrice(p.price),
    }));
    setProducts(formattedResponse);
  }

  function changeProductAmount(title, amount) {
    const newProducts = products.map(p => {
      const newAmount = p.amount + amount;
      if (newAmount < 1) {
        return p;
      }

      if (p.title === title) {
        return {
          ...p,
          amount: newAmount,
          formattedPrice: formatPrice(p.price * newAmount),
        };
      }

      return p;
    });
    setProducts(newProducts);
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

      <MenuContainer id="menu">
        <UnderlinedTitle>Cardápio</UnderlinedTitle>

        {!loaded ? (
          <LoadingSpin />
        ) : loaded && products.length == 0 ? (
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
                      <MenuCardOptionSelectAmountButton
                        disabled={product.amount === 1}
                        onClick={() => changeProductAmount(product.title, -1)}
                      >
                        <IoRemove color="#777" size={26} />
                      </MenuCardOptionSelectAmountButton>

                      <MenuCardAmount>{product.amount}</MenuCardAmount>

                      <MenuCardOptionSelectAmountButton
                        onClick={() => changeProductAmount(product.title, +1)}
                      >
                        <IoAdd color="#777" size={26} />
                      </MenuCardOptionSelectAmountButton>
                    </MenuCardOptionBackground>
                  </MenuCardOption>

                  <MenuCardOption width="38%">
                    <MenuCardOptionBackground>
                      <MenuCardPrice>{product.formattedPrice}</MenuCardPrice>
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
        )}
      </MenuContainer>
    </>
  );
}

export default Home;
