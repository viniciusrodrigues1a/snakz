import styled from "styled-components";

export const Container = styled.td`
  text-align: center;
  padding-right: 1rem;
  height: 8rem;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  @media (min-width: 40.25rem) {
    width: 12rem;
  }

  @media (min-width: 68.5rem) {
    width: 16rem;
  }
`;

export const OriginalPrice = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7.5rem;
  height: 2.15rem;
  padding-left: 0.75rem;
  padding-bottom: 0.25rem;
  background-color: #962f2f;
  border-top-left-radius: 0.25rem;
  position: absolute;
  z-index: 1;
  bottom: -0.4rem;
  left: -0.5rem;
  transform: translateY(-100%);
  color: var(--light);
  text-decoration: line-through;
  font-weight: 500;

  > button {
    border: none;
    background: none;

    > svg {
      pointer-events: none;
    }
  }
`;

export const Actions = styled.div`
  position: absolute;
  display: ${({ shown }) => (shown ? "flex" : "none")};
  flex-direction: column;
  background-color: var(--light);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 0.75rem 1rem;
  right: -3.5rem;
  top: 0;

  > svg:first-child {
    margin-bottom: 0.75rem;
  }

  > svg {
    cursor: pointer;
  }
`;

export const CurrentPrice = styled.strong`
  background-color: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.15rem;
  color: var(--dark);
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  z-index: 2;

  @media (min-width: 33.75rem) {
    font-size: 1.2rem;
  }
`;

export const MenuActions = styled.div``;
