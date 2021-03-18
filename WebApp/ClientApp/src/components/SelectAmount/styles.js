import styled from "styled-components";

export const Container = styled.div`
  border-radius: 0.4rem;
  box-shadow: 2px 2px 4px rgba(72, 72, 72, 0.5);
  background: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button.attrs(_ => ({
  type: "button",
}))`
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: none;
  border: 0;
  margin: 1rem;
`;

export const Amount = styled.span`
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
