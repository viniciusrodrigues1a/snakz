import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const IconContainer = styled.div`
  display: inline-block;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  &:after {
    content: "";
    width: 140%;
    height: 0.4rem;
    background-color: #a0a0a0;
    position: absolute;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(45deg);
  }
`;

export const Text = styled.strong`
  margin-top: 3.375rem;
  color: #555;
  display: flex;
  align-items: center;

  > svg {
    margin-left: 0.5rem;
  }
`;
