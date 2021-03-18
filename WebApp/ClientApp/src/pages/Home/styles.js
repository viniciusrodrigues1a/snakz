import styled from "styled-components";

import heroImg from "../../assets/images/hero.png";

export const Container = styled.main`
  padding-bottom: 18rem;
`;

/* Hero section */
export const HeroContainer = styled.div`
  background-image: url(${heroImg});
  background-position: 60%;
  width: 100%;
  height: 614px;

  @media (min-width: 996px) {
    background-position: center;
    height: 714px;
  }

  @media (min-width: 1280px) {
    height: 814px;
  }
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #000000, rgba(22, 22, 22, 0.6));
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 2.75rem;
`;

export const HeroIntroduction = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  line-height: 4.5rem;
  color: var(--light);
  opacity: 0.85;

  strong {
    font-weight: bold;
    position: relative;
    z-index: 1;

    &:after {
      content: "";
      width: 100%;
      height: 1rem;
      position: absolute;
      bottom: 0.55rem;
      left: 0;
      background-color: var(--underlined-highlight);
      transform: rotate(-1deg);
      z-index: -1;
    }
  }

  @media (min-width: 996px) {
    font-size: 4.5rem;
    line-height: 5rem;

    strong:after {
      height: 1.25rem;
      bottom: 0.75rem;
    }
  }

  @media (min-width: 1280px) {
    font-size: 6rem;
    line-height: 7.5rem;

    strong:after {
      height: 1.65rem;
    }
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.65rem;
  margin-top: 4.5rem;
  color: var(--light);
  opacity: 0.85;

  @media (min-width: 996px) {
    font-size: 2rem;
  }

  @media (min-width: 1280px) {
    font-size: 2.35rem;
  }
`;

/* Menu section */
export const MenuContainer = styled.div`
  margin-top: 6.375rem;
  padding: 0 2.75rem;
`;

export const MenuEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > strong {
    color: #555;
    display: flex;
    align-items: center;

    > svg {
      margin-left: 0.5rem;
    }
  }
`;

export const MenuEmptyIcon = styled.div`
  display: inline-block;
  margin: 3.375rem auto;
  position: relative;
  z-index: 1;

  &:after {
    content: "";
    width: 140%;
    height: 0.4rem;
    background-color: #a0a0a0;
    position: absolute;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(45deg);
  }
`;

export const MenuCardGrid = styled.div`
  margin-top: 3.375rem;
  display: grid;
  grid-gap: 4rem;

  @media (min-width: 576px) {
    width: 90%;
    margin: 3.375rem auto 0;
  }

  @media (min-width: 664px) {
    width: 75%;
    margin: 3.375rem auto 0;
  }
  @media (min-width: 776px) {
    width: 70%;
    margin: 3.375rem auto 0;
  }

  @media (min-width: 996px) {
    width: 100%;
    margin: 3.375rem 0 0;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MenuCard = styled.div`
  background-color: #ffffff;
  border-radius: 3.125rem;
  border: 1px solid #c4c4c4;
  box-shadow: 4px 4px 4px rgba(51, 51, 51, 0.25);
  padding: 2.75rem;
  display: inline-block;

  > img {
    display: block;
    margin: 0 auto;
    width: 12.25rem;
    height: 12.25rem;
    box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.25);
    border: 2px solid #ddd;
    object-fit: cover;
    border-radius: 50%;
  }

  > strong,
  > span {
    display: block;
    text-align: center;
    margin-top: 1.25rem;
  }

  > strong {
    color: var(--dark);
    font-size: 2.25rem;
    font-weight: 500;
  }

  > span {
    color: #666666;
    font-size: 1.25rem;
  }

  @media (min-width: 1280px) {
    padding: 1.75rem;
  }
`;

export const MenuCardOptionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.125rem;

  @media (min-width: 496px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const MenuCardOption = styled.div`
  margin-top: 1rem;
  height: 4rem;

  @media (min-width: 496px) {
    margin-top: 0;
    width: ${({ width }) => width || "initial"};
  }
`;

export const MenuCardOptionBackground = styled.div`
  border-radius: 0.85rem;
  box-shadow: 2px 2px 4px rgba(72, 72, 72, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuCardOptionSelectAmountButton = styled.button.attrs(_ => ({
  type: "button",
}))`
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: none;
  border: 0;
  margin: 1rem;
`;

export const MenuCardAmount = styled.div`
  color: var(--dark);
  font-size: 1.5rem;
  margin: 0 auto;

  @media (min-width: 496px) {
    margin: 0 auto;
    font-size: 1.3rem;
  }

  @media (min-width: 996px) {
    margin: 0 auto;
  }
`;

export const MenuCardPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 496px) {
    font-size: 1.3rem;
  }
`;

export const Bag = styled.button.attrs(_ => ({
  type: "button",
}))`
  width: 100%;
  background-color: var(--orange);
  padding: 0 1rem;
  border: 0;
  border-radius: 0.85rem;
  box-shadow: 2px 2px 4px rgba(72, 72, 72, 0.5);
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
