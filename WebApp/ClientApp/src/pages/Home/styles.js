import styled, { css, keyframes } from "styled-components";

export const Container = styled.main`
  padding-bottom: 18rem;
`;

export const FixedBagLinkContainer = styled.div`
  display: none;
  position: absolute;
  top: 2.75rem;
  right: 2.75rem;
  z-index: 1;
  opacity: 0;

  > a {
    width: 4rem;
    height: 3.25rem;
    border: 0;
    border-radius: 0.4rem;
    padding: 0 0.8rem;
    box-shadow: 2px 2px 4px rgba(252, 122, 87, 0.5);
    background-color: var(--orange);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

export const FixedBagItemsIndicator = styled.span`
  position: absolute;
  top: -1rem;
  left: -1rem;
  background-color: var(--light);
  border: 2px solid var(--orange);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

/* Header */
export const Header = styled.header`
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
  height: 36rem;
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    97.96deg,
    rgba(0, 0, 0, 0.8) 50.01%,
    rgba(34, 34, 34, 0.4) 100%,
    rgba(0, 0, 0, 0.5) 100%
  );
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 2.75rem;
  height: 9rem;
  background-color: ${({ isNavOpen }) => (isNavOpen ? "var(--dark)" : "none")};

  @media (min-width: 776px) {
    background-color: transparent !important;
  }
`;

export const Navbar = styled.nav`
  display: ${({ isNavOpen }) => (isNavOpen ? "initial" : "none")};
  border-top: 1px solid var(--orange);
  background: ${({ isNavOpen }) => (isNavOpen ? "var(--dark)" : "none")};
  width: 100vw;
  padding: 2.5rem 0;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);

  @media (min-width: 48.5rem) {
    display: initial !important;
    width: initial;
    position: initial;
    transform: initial;
    border: 0;
    padding: 0;
    bottom: 0;
    left: 50%;
    background-color: transparent !important;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 48.5rem) {
    flex-direction: row;
    align-items: center;
    margin: 0;
  }
`;

export const NavItem = styled.li`
  > a {
    font-weight: 500;
    font-size: 1.3rem;
    letter-spacing: 0.05rem;
    transition: 0.1s;
    color: var(--light);
    text-transform: uppercase;
  }

  & + & {
    margin-top: 1.5rem;
  }

  @media (min-width: 48.5rem) {
    & + & {
      margin-top: 0;
      margin-left: 2.5rem;
    }

    a:hover {
      filter: brightness(0.85);
    }
  }

  @media (min-width: 64rem) {
    > a {
      font-size: 1.45rem;
    }

    & + & {
      margin-left: 4rem;
    }
  }
`;

export const NavItemBag = styled.li`
  margin-top: 1.5rem;

  a {
    font-size: 1.4rem;
    transition: 0.1s;
    letter-spacing: 0.05rem;
    color: var(--light);
    background-color: var(--orange);
    display: flex;
    align-items: center;
    border-radius: 2px;
    height: 3.25rem;
    padding: 0 0.8rem;
    text-transform: uppercase;
  }

  a strong {
    margin-left: 0.9rem;
    font-weight: 500;
  }

  @media (min-width: 48.5rem) {
    &:hover {
      color: var(--light);
      transform: scale(1.05);
      box-shadow: 2px 2px 4px var(--orange);
    }

    a:hover {
      color: var(--light);
    }

    margin-top: 0;
    margin-left: 2.5rem;
  }

  @media (min-width: 64rem) {
    a {
      font-size: 1.55rem;
    }

    margin-left: 4rem;
  }
`;

export const DropdownButton = styled.button`
  border: 0;
  padding: 0;
  background: none;

  @media (min-width: 48.5rem) {
    display: none;
  }
`;

export const HeroContainer = styled.div`
  margin-top: 6rem;
  color: var(--light);
  padding: 0 2rem;
`;

export const HeroTitle = styled.h1`
  font-weight: 700;
  font-size: 2.65rem;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

  > span {
    color: var(--primary);
  }

  @media (min-width: 48.5rem) {
    font-size: 3rem;
  }

  @media (min-width: 68.75rem) {
    font-size: 3.3rem;
  }

  @media (min-width: 100rem) {
    font-size: 3.6rem;
  }
`;

export const HeroSubtitle = styled.h2`
  font-weight: 500;
  font-size: 1.35rem;
  margin-top: 2.5rem;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.9;

  @media (min-width: 48.5rem) {
    font-size: 1.45rem;
  }

  @media (min-width: 68.75rem) {
    font-size: 1.55rem;
  }

  @media (min-width: 100rem) {
    font-size: 1.65rem;
  }
`;

/* Menu section */
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.h1`
  font-family: Pacifico;
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 4rem;
  color: var(--dark);

  @media (min-width: 48.5rem) {
    font-size: 5.25rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 68.75rem) {
    font-size: 6.3rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 100rem) {
    font-size: 5rem;
    margin-bottom: 4rem;
  }
`;

export const ProductContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const leave = keyframes`
  from {
    opacity: 1;
  } to {
  opacity: 0;
  }
`;

const enterRight = keyframes`
  from {
    transform: translateX(100vw);
  } to {
    transform: translateX(0);
  }
`;

const enterLeft = keyframes`
  from {
    transform: translateX(-100vw);
  } to {
    transform: translateX(0);
  }
`;

const productAnimations = {
  leaving: {
    anim: leave,
    duration: "0.2s",
    timingFunction: "ease-in",
  },
  enteringFromLeft: {
    anim: enterLeft,
    duration: "0.5s",
    timingFunction: "ease-out",
  },
  enteringFromRight: {
    anim: enterRight,
    duration: "0.5s",
    timingFunction: "ease-out",
  },
};

const createProductAnimationCss = animationState => css`
  animation-name: ${animationState && productAnimations[animationState].anim};
  animation-duration: ${animationState &&
  productAnimations[animationState].duration};
  animation-duration: ${animationState &&
  productAnimations[animationState].timingFunction};
  animation-fill-mode: forwards;
`;

export const Product = styled.div`
  display: flex;

  ${({ animationState }) => createProductAnimationCss(animationState)};

  &:nth-child(odd) {
    flex-direction: ${({ dontReverse }) =>
      dontReverse ? "row" : "row-reverse"};
  }
`;

const containerSizeMedia = css`
  width: 12rem;
  height: 12rem;

  @media (min-width: 48.5rem) {
    width: 18.75rem;
    height: 15rem;
  }

  @media (min-width: 68.75rem) {
    width: 25rem;
    height: 20rem;
  }

  @media (min-width: 100rem) {
    width: 31.25rem;
    height: 25rem;
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;

  > img {
    ${containerSizeMedia}
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;

  ${containerSizeMedia}

  @media (min-width: 48.5rem) {
    padding: 1rem 0.5rem 1rem 0.5rem;
  }

  @media (min-width: 100rem) {
    padding: 2.5rem 0.5rem 2.5rem 0.5rem;
  }
`;

export const ProductTitle = styled.strong`
  font-family: Bangers;
  font-size: 1.75rem;
  text-align: center;
  color: var(--dark);

  @media (min-width: 48.5rem) {
    font-size: 2.2rem;
  }

  @media (min-width: 68.75rem) {
    font-size: 2.7rem;
  }

  @media (min-width: 100rem) {
    font-size: 3.3rem;
  }
`;

export const ProductDescription = styled.span`
  font-family: Roboto;
  font-size: 0.9rem;
  text-align: center;
  color: #555555;
  margin: 0 auto;

  @media (min-width: 48.5rem) {
    font-size: 1.1rem;
  }

  @media (min-width: 68.75rem) {
    font-size: 1.3rem;
  }

  @media (min-width: 100rem) {
    width: 80%;
    font-size: 1.5rem;
  }
`;

export const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.3rem;

  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      display: none;
    }
  }

  @media (min-width: 41.5rem) {
    margin: 0 0.5rem;
  }

  @media (min-width: 48.5rem) {
    justify-content: space-evenly;
  }

  @media (min-width: 68.75rem) {
    > div:first-child {
      > span {
        display: initial;
        margin-right: 8px;
        align-self: flex-end;
        margin-bottom: 2px;
      }
    }
  }
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > del {
    font-family: Roboto;
    font-weight: normal;
    font-size: 1rem;
    color: var(--dark);
    text-shadow: none;
    background: #8b000066;
    padding: 0.05rem 0.5rem;
    align-self: flex-start;
    display: ${({ showDiscount }) => (showDiscount ? "initial" : "none")};
  }

  > strong {
    font-family: Roboto;
    font-weight: bold;
    font-size: 1.4rem;
    color: var(--dark);
    text-shadow: 0px 4px 4px rgba(205, 70, 27, 0.25);
  }
`;

export const AddToCartButton = styled.button`
  background-color: var(--primary);
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SlideCircles = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 48.5rem) {
    margin-top: 2.5rem;
  }

  @media (min-width: 68.75rem) {
    margin-top: 3rem;
  }

  @media (min-width: 100rem) {
    margin-top: 4rem;
  }
`;

export const Circle = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: gray;
  background: linear-gradient(90deg, gray, rgba(0, 0, 0, 0.6));
  border: none;
  border-radius: 50%;
  margin: 0 0.5rem;
  transition: 0.2s;
  opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
`;
