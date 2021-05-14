import styled from "styled-components";

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
  font-size: 2.625rem;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

  > span {
    color: var(--primary);
  }
`;

export const HeroSubtitle = styled.h2`
  font-weight: 500;
  font-size: 1.325rem;
  margin-top: 2.5rem;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.9;
`;

/* Menu section */
export const MenuContainer = styled.div`
  margin-top: 6.375rem;
  padding: 0 2.75rem;
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
  height: 3rem;

  @media (min-width: 496px) {
    margin-top: 0;
    width: ${({ width }) => width || "initial"};
  }
`;

export const MenuCardPrice = styled.div`
  border-radius: 0.4rem;
  box-shadow: 2px 2px 4px rgba(72, 72, 72, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 496px) {
    font-size: 1.3rem;
  }
`;

export const MenuCardBagButton = styled.button.attrs(_ => ({
  type: "button",
}))`
  width: 100%;
  background-color: var(--orange);
  padding: 0 1rem;
  border: 0;
  border-radius: 0.4rem;
  box-shadow: 2px 2px 4px rgba(72, 72, 72, 0.5);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:active {
    opacity: 0.5;
    scale: 1.1;
  }
`;
