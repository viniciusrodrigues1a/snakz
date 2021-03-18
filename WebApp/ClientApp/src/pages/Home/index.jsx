import React, { useState, useEffect, useContext } from "react";
import {
  IoBagAddOutline,
  IoFastFoodOutline,
  IoSadOutline,
} from "react-icons/io5";

import formatPrice from "../../utils/formatPrice";
import { BagContext } from "../../contexts/BagContext";

import UnderlinedTitle from "../../components/UnderlinedTitle";
import LoadingSpin from "../../components/LoadingSpin";
import SelectAmount from "../../components/SelectAmount";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  Container,
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
  MenuCardPrice,
  Bag,
} from "./styles";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const { addItemToBag } = useContext(BagContext);

  useEffect(() => {
    (async () => {
      await fetchProducts();
      setLoaded(true);
    })();
  }, []);

  async function fetchProducts() {
    const response = await fetch("/products").then(res => res.json());
    const formattedResponse = response.map(p => {
      const amount = 1;
      return {
        ...p,
        amount,
        formattedPrice: formatPrice(p.price),
        formattedSubtotal: formatPrice(p.price * amount),
      };
    });
    setProducts(formattedResponse);
  }

  function changeProductAmount(title) {
    return amount => {
      const newProducts = products.map(p => {
        const newAmount = p.amount + amount;
        if (newAmount < 1) {
          return p;
        }

        if (p.title === title) {
          return {
            ...p,
            amount: newAmount,
            formattedSubtotal: formatPrice(p.price * newAmount),
          };
        }

        return p;
      });
      setProducts(newProducts);
    };
  }

  function imageFallback(e) {
    e.target.src = burgerFallbackImg;
  }

  return (
    <Container>
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
                    <SelectAmount
                      onChangeAmount={changeProductAmount(product.title)}
                    />
                  </MenuCardOption>

                  <MenuCardOption width="38%">
                    <MenuCardPrice>{product.formattedSubtotal}</MenuCardPrice>
                  </MenuCardOption>

                  <MenuCardOption>
                    <Bag onClick={() => addItemToBag(product)}>
                      <IoBagAddOutline size={28} color="#ffffff" />
                    </Bag>
                  </MenuCardOption>
                </MenuCardOptionList>
              </MenuCard>
            ))}
          </MenuCardGrid>
        )}
      </MenuContainer>
    </Container>
  );
}

export default Home;
