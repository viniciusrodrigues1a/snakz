import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  margin: 2rem auto;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 6px solid #888;
  border-top: 6px solid transparent;
  animation: ${rotate} 0.5s linear infinite;
`;
