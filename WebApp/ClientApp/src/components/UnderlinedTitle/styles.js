import styled from "styled-components";

export const Title = styled.h1`
  color: var(--dark);
  font-size: 4rem;
  font-family: "Dancing Script", cursive;
  position: relative;
  display: inline-block;
  z-index: 1;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #f7b393;
    width: 100%;
    height: 0.75rem;
    border-top-left-radius: 3.125rem;
    border-bottom-right-radius: 3.125rem;
    transform: rotate(-1deg);
    z-index: -1;
  }
`;
