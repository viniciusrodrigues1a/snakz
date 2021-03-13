import styled from "styled-components";

import heroImg from "../../assets/images/hero.png";

export const Container = styled.div`
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 2.75rem;
`;

export const Introduction = styled.h1`
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

export const Description = styled.p`
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
