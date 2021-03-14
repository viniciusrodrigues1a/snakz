import styled from "styled-components";

export const Container = styled.header`
  background: var(--dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 2.75rem;
`;

export const NavContainer = styled.nav`
  display: ${({ isShown }) => (isShown ? "initial" : "none")};
  border-top: 1px solid var(--orange);
  background: var(--dark);
  width: 100%;
  padding: 2.5rem 0;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);

  @media (min-width: 776px) {
    display: initial !important;
    width: initial;
    position: initial;
    transform: initial;
    border: 0;
    padding: 0;
    bottom: 0;
    left: 50%;
  }
`;

export const Nav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 776px) {
    flex-direction: row;
    align-items: center;
    margin: 0;
  }
`;

export const NavItem = styled.li`
  color: var(--light);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.4rem;
  transition: 0.1s;
  letter-spacing: 0.05rem;

  & + & {
    margin-top: 1.5rem;
  }

  @media (min-width: 776px) {
    font-size: 1.1rem;

    & + & {
      margin-top: 0;
      margin-left: 2.5rem;
    }

    a:hover {
      filter: brightness(0.85);
    }
  }

  @media (min-width: 1280px) {
    font-size: 1.25rem;
  }
`;

export const NavItemBag = styled.li`
  margin-top: 1.5rem;
  font-size: 1.6rem;
  transition: 0.1s;
  letter-spacing: 0.05rem;

  a {
    color: var(--light);
    background-color: var(--orange);
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
  }

  a strong {
    margin-left: 0.9rem;
    font-weight: 500;
  }

  @media (min-width: 776px) {
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
`;

export const DropdownButton = styled.button`
  border: 0;
  padding: 0;
  background: none;

  @media (min-width: 776px) {
    display: none;
  }
`;
