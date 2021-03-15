import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.footer`
  background-color: var(--dark);
  margin-top: 8rem;
  position: relative;
  padding: 2.5rem;
`;

export const ScrollUpLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: -47px;
  width: 48px;
  height: 49px;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--dark);
  cursor: pointer;

  > svg:first-child {
    margin-bottom: -8px;
  }

  > svg:last-child {
    margin-top: -8px;
  }
`;

export const Info = styled.div`
  opacity: ${({ highlight }) => (highlight ? "1" : "0.6")};
  display: flex;
  align-items: center;

  > strong,
  > span {
    color: var(--white);
    font-size: 1.375rem;
    margin-left: 1rem;
  }

  & + & {
    margin-top: 1rem;
  }
`;
