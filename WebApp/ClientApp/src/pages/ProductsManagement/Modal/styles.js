import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
  background-color: var(--light);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.15rem;

  div:last-child {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
`;

export const ModalHeading = styled.h1`
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
`;

export const Button = styled.button.attrs(_ => ({
  type: "button",
}))`
  border: 0;
  border-radius: 0.15rem;
  padding: 0.4rem 0.75rem;
  letter-spacing: 0.02rem;
  color: ${({ outlined }) => (outlined ? "var(--dark)" : "var(--light)")};
  border: 1px solid ${({ color }) => color};
  background-color: ${({ color, outlined }) => (outlined ? "none" : color)};
  transition: 0.2s;

  &:last-child {
    margin-left: 1rem;
  }

  &:hover {
    background: ${({ color, outlined }) => (outlined ? color : "none")};
    color: ${({ outlined }) => (outlined ? "var(--light)" : "var(--dark)")};
  }
`;
