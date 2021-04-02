import styled from "styled-components";

export const Container = styled.main`
  padding: 1rem 0.25rem;
  padding-bottom: 16rem;

  @media (min-width: 31.5rem) {
    padding: 2rem 0.5rem;
    padding-bottom: 16rem;
  }

  @media (min-width: 48.5rem) {
    padding: 2rem;
    padding-bottom: 16rem;
  }

  @media (min-width: 68.5rem) {
    padding: 2rem 4rem;
    padding-bottom: 16rem;
  }
`;
