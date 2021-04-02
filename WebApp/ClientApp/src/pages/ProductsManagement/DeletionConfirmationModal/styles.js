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

  > div {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
`;

export const Title = styled.strong`
  letter-spacing: 0.05rem;
  font-size: 1.15rem;
  color: var(--dark);
`;

export const Button = styled.button.attrs(_ => ({
  type: "button",
}))`
  border: 0;
  border-radius: 0.15rem;
  padding: 0.5rem 1rem;
  letter-spacing: 0.02rem;
  font-weight: 500;
  color: var(--dark);
  border: 1px solid ${({ color }) => color};
  transition: 0.2s;

  &:last-child {
    margin-left: 1rem;
  }

  &:hover {
    background: ${({ color }) => color};
    color: var(--light);
  }
`;
