import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  IoBagAddOutline,
  IoBagHandleOutline,
  IoFastFoodOutline,
  IoArrowForwardOutline,
  IoMenuOutline,
} from "react-icons/io5";

import animate from "./utils/animations";
import formatPrice from "../../utils/formatPrice";
import { fetchProducts } from "../../utils/fetchProducts";
import { BagContext } from "../../contexts/BagContext";

import LoadingSpin from "../../components/LoadingSpin";
import EmptyList from "../../components/EmptyList";
import BottomNotification from "./BottomNotification";

import heroImg from "../../assets/images/hero.png";
import logoImg from "../../assets/images/logo.png";
import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  Container,
  FixedBagLinkContainer,
  FixedBagItemsIndicator,
  Header,
  HeaderContent,
  BackgroundOverlay,
  NavContainer,
  Navbar,
  NavList,
  NavItem,
  NavItemBag,
  DropdownButton,
  HeroContainer,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionTitle,
  Product,
  ProductImageContainer,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  Price,
  AddToCartButton,
} from "./styles";

let fadeoutTimeout = null;
let visibilityTimeout = null;

function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsWithDiscount, setProductsWithDiscount] = useState([]);
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
      setProductsWithDiscount(
        response.filter(p => p.formattedDiscountPrice !== null)
      );
      animate(fixedBagRef.current).bringFixedBagToScreen();
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    history.listen(() => {
      setIsNavOpen(false);
    });
  }, [history]);

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

      <Header img={heroImg}>
        <BackgroundOverlay>
          <HeaderContent>
            <NavContainer isNavOpen={isNavOpen}>
              <Link to="/">
                <img src={logoImg} alt="Snakz" />
              </Link>

              <Navbar isNavOpen={isNavOpen}>
                <NavList>
                  <NavItem>
                    <a href="#menu">Cardápio</a>
                  </NavItem>
                  <NavItem>
                    <a href="#footer">Contato</a>
                  </NavItem>
                  <NavItemBag>
                    <Link to="/sacola">
                      <IoBagHandleOutline size={28} />
                      <strong>Sacola</strong>
                    </Link>
                  </NavItemBag>
                </NavList>
              </Navbar>

              <DropdownButton onClick={() => setIsNavOpen(!isNavOpen)}>
                <IoMenuOutline color="#fff" size={48} />
              </DropdownButton>
            </NavContainer>

            <HeroContainer>
              <HeroTitle>
                Hamburguer para <span>todo mundo!</span>
              </HeroTitle>

              <HeroSubtitle>
                Venha lanchar no melhor lugar da cidade!
              </HeroSubtitle>
            </HeroContainer>
          </HeaderContent>
        </BackgroundOverlay>
      </Header>

      <Section>
        <SectionTitle>Ofertas</SectionTitle>

        {!loaded ? (
          <LoadingSpin />
        ) : loaded && products.length === 0 ? (
          <EmptyList
            icon={() => <IoFastFoodOutline color="#bbb" size={116} />}
            message="Não há nada aqui"
          />
        ) : (
          productsWithDiscount.map(product => (
            <Product>
              <ProductImageContainer>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  onError={imageFallback}
                />
              </ProductImageContainer>
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>
                  <div>
                    <span>Por apenas</span>
                    <Price showDiscount={!!product.formattedDiscountPrice}>
                      <del>{product.formattedPrice}</del>{" "}
                      <strong>
                        {product.formattedDiscountPrice
                          ? product.formattedDiscountPrice
                          : product.formattedPrice}
                      </strong>
                    </Price>
                  </div>
                  <AddToCartButton type="button">
                    <IoBagAddOutline size={28} color="var(--light)" />
                  </AddToCartButton>
                </ProductPrice>
              </ProductInfo>
            </Product>
          ))
        )}
      </Section>

      <Section id="menu">
        <SectionTitle>Cardápio</SectionTitle>
        {!loaded ? (
          <LoadingSpin />
        ) : loaded && products.length === 0 ? (
          <EmptyList
            icon={() => <IoFastFoodOutline color="#bbb" size={116} />}
            message="Não há nada aqui"
          />
        ) : (
          products.map(product => (
            <Product>
              <ProductImageContainer>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  onError={imageFallback}
                />
              </ProductImageContainer>
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>
                  <div>
                    <span>Por apenas</span>
                    <Price showDiscount={!!product.formattedDiscountPrice}>
                      <del>{product.formattedPrice}</del>{" "}
                      <strong>
                        {product.formattedDiscountPrice
                          ? product.formattedDiscountPrice
                          : product.formattedPrice}
                      </strong>
                    </Price>
                  </div>
                  <AddToCartButton
                    type="button"
                    onClick={() => handleAddingItemToBag(product)}
                  >
                    <IoBagAddOutline size={30} color="var(--light)" />
                  </AddToCartButton>
                </ProductPrice>
              </ProductInfo>
            </Product>
          ))
        )}
      </Section>
    </Container>
  );
}

export default Home;
