import styled from "styled-components";

export const Notification = styled.span`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  height: 3.25rem;
  padding: 0 1.2rem;
  background-color: #65fc57;
  background-color: #fc5765;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0.4rem;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  opacity: 0;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: var(--dark);

  > svg {
    margin-left: 0.8rem;
  }
`;
