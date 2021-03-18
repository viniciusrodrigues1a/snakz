import styled from "styled-components";

export const Container = styled.footer`
  background-color: var(--dark);
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;

export const Content = styled.div`
  position: relative;
  padding: 2.5rem;
`;

export const ScrollUpAnchor = styled.a`
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
