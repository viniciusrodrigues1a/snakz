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

export const BagEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > strong {
    margin: 2.375rem 0;
    color: #555;
    display: flex;
    align-items: center;

    > svg {
      margin-left: 0.5rem;
    }
  }
`;

export const BagEmptyIcon = styled.div`
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

export const BagEmptyButton = styled.button.attrs(_ => ({
  type: "button",
}))`
  border: 0;
  background-color: var(--dark);
  color: var(--light);
  letter-spacing: 0.05rem;
  font-size: 1.15rem;
  font-weight: bold;
  padding: 1.2rem 1.3rem;
  border-radius: 4px;
  transition: 0.1s;
`;

export const Content = styled.div`
  background: linear-gradient(360deg, #616161, #8b8b8b);
  background: none;
  border-radius: 1rem;
  margin: 2rem 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    background-color: #dedede;
  }

  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  tr + tr {
    border-top: 1rem solid var(--light);
  }
`;

export const TdImage = styled.td`
  display: none;
  border-radius: 4px;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 1px solid #22222244;
    background-color: #eee;
  }

  @media (min-width: 40.25rem) {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    display: table-cell;
  }
`;

export const TdProduct = styled.td`
  padding-left: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    color: var(--dark);
  }

  @media (min-width: 40.25rem) {
    padding-left: 0;
  }
`;

export const TdAmount = styled.td`
  > div {
    scale: 0.9;
    width: 8rem;
    height: 2.5rem;
  }

  @media (min-width: 40.25rem) {
    > div {
      scale: 1;
      margin: 0 auto;
    }
  }
`;

export const TdPrice = styled.td`
  width: 7rem;
  text-align: center;
  padding-right: 1rem;

  > strong {
    color: var(--dark);
  }

  @media (min-width: 33.75rem) {
    font-size: 1.2rem;
  }

  @media (min-width: 40.25rem) {
    width: 12rem;
  }

  @media (min-width: 68.5rem) {
    width: 16rem;
  }
`;

export const TdDelete = styled.td`
  width: 3rem;
  background: var(--light);
  text-align: right;

  > svg {
    cursor: pointer;
  }

  @media (min-width: 48.5rem) {
    width: 4rem;
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin-top: 1.75rem;

  @media (min-width: 35rem) {
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
`;

export const CompleteOrder = styled.button.attrs(_ => ({
  type: "button",
}))`
  background-color: #fc7a57;
  border: 0;
  border-radius: 0.25rem;
  padding: 0.6rem 1.5rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: var(--light);
  font-weight: bold;
  font-size: 1.15rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const OrderPrice = styled.strong`
  color: var(--dark);
  text-transform: uppercase;
  margin: 1rem 0;
  letter-spacing: 0.05rem;

  > strong {
    color: #fc7a57;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    font-size: 2rem;
    margin-left: 0.25rem;
    letter-spacing: 0;
  }

  @media (min-width: 35rem) {
    margin: 0;
  }
`;
