import styled from "styled-components";

export const Container = styled.header`
  background: var(--dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 2.75rem;
  height: 9rem;

  > div {
    width: 100%;
    max-width: 100rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > a {
      color: var(--light);
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.3rem;
      transition: 0.1s;
      letter-spacing: 0.05rem;

      &:hover {
        filter: brightness(0.85);
      }

      @media (min-width: 64rem) {
        font-size: 1.45rem;
      }
    }
  }
`;
