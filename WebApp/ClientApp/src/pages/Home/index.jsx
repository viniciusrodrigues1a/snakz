import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  IoBagAddOutline,
  IoBagHandleOutline,
  IoFastFoodOutline,
  IoSadOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

import animate from "./utils/animations";
import formatPrice from "../../utils/formatPrice";
import fetchProducts from "../../utils/fetchProducts";
import { BagContext } from "../../contexts/BagContext";

import UnderlinedTitle from "../../components/UnderlinedTitle";
import LoadingSpin from "../../components/LoadingSpin";
import SelectAmount from "../../components/SelectAmount";
import BottomNotification from "./BottomNotification";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  Container,
  HeroContainer,
  FixedBagLinkContainer,
  FixedBagItemsIndicator,
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
  MenuCardBagButton,
} from "./styles";

let fadeoutTimeout = null;
let visibilityTimeout = null;

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
    icon: () => null,
  });
  const { addItemToBag, items } = useContext(BagContext);
  const history = useHistory();
  const fixedBagRef = useRef(null);
  const itemsIndicatorRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await fetchProducts();
      setProducts(response);
      animate(fixedBagRef.current).bringFixedBagToScreen();
      setLoaded(true);
    })();
  }, []);

  function handleAddingItemToBag(product) {
    resetTimeouts();
    addTimeouts();
    try {
      handleAddingItemToBagSuccess(product);
    } catch (e) {
      if (e.message === "Item já está em sua sacola!") {
        handleItemAlreadyInBag();
      }
    }
  }

  function handleAddingItemToBagSuccess(product) {
    const animateNotification = animate(notificationRef.current);

    addItemToBag(product);
    setSuccessNotification();
    animateNotification.comingUp();
    animateNotification.fadingIn();
    animate(itemsIndicatorRef.current).scalingUp();
  }

  function resetTimeouts() {
    clearTimeout(fadeoutTimeout);
    clearTimeout(visibilityTimeout);
  }

  function addTimeouts() {
    fadeoutTimeout = setTimeout(() => {
      animate(notificationRef.current).fadingOut();
    }, 1900);
    visibilityTimeout = setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 2000);
  }

  function handleItemAlreadyInBag() {
    const animateNotification = animate(notificationRef.current);

    setErrorNotification();
    animateNotification.fadingIn();
    animateNotification.errorShaking();
  }

  function setSuccessNotification() {
    setNotification({
      message: "Item adicionado à sacola!",
      icon: () => <IoArrowForwardOutline color="#222" size={24} />,
      backgroundColor: "#65fc57",
      visible: true,
      onClick: () => {
        history.push("/sacola");
      },
    });
  }

  function setErrorNotification() {
    setNotification({
      message: "Item já está em sua sacola!",
      icon: () => null,
      backgroundColor: "#fc5765",
      visible: true,
      onClick: () => {
        setNotification({ ...notification, visible: false });
      },
    });
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
      <BottomNotification
        notificationRef={notificationRef}
        message={notification.message}
        icon={notification.icon}
        visible={notification.visible}
        backgroundColor={notification.backgroundColor}
        onClick={notification.onClick}
      />
      <FixedBagLinkContainer ref={fixedBagRef}>
        <Link to="/sacola">
          <IoBagHandleOutline size={28} color="#eee" />
          {items.length > 0 && (
            <FixedBagItemsIndicator ref={itemsIndicatorRef}>
              {items.length}
            </FixedBagItemsIndicator>
          )}
        </Link>
      </FixedBagLinkContainer>
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
                    <MenuCardBagButton
                      onClick={() => handleAddingItemToBag(product)}
                    >
                      <IoBagAddOutline size={28} color="#ffffff" />
                    </MenuCardBagButton>
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
