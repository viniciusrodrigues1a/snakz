import styled from "styled-components";

export const Container = styled.main`
  padding: 1rem;
  padding-bottom: 16rem;
  margin-top: 2rem;

  @media (min-width: 31.5rem) {
    padding: 2rem;
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
  border-radius: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-transform: uppercase;
    color: var(--dark);
  }

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  th:first-child,
  td:first-child {
    display: none;
  }

  td:last-child,
  th:last-child {
    padding-right: 1rem;
  }

  th:nth-child(2),
  td:nth-child(2) {
    padding-left: 1rem;
  }

  tr + tr {
    border-top: 1px solid #22222222;
  }

  @media (min-width: 33.75rem) {
    th {
      letter-spacing: 0.05rem;
      font-size: 1.15rem;
    }
  }

  @media (min-width: 40.25rem) {
    th:first-child,
    td:first-child {
      padding-top: 2rem;
      padding-bottom: 1rem;
      padding-left: 2rem;
      display: table-cell;
    }

    td:last-child,
    th:last-child {
      padding-right: 2rem;
    }

    th:nth-child(2),
    td:nth-child(2) {
      padding-left: 0;
    }

    th {
      text-transform: uppercase;
      color: var(--dark);
      letter-spacing: 0.05rem;
      font-size: 1.1rem;
      padding-top: 2rem;
      padding-bottom: 0;
    }
  }
`;

export const ThAmount = styled.th`
  text-align: center;
`;

export const ThPrice = styled.th`
  text-align: right;
  padding-right: 1.5rem;
`;

export const TdImage = styled.td`
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 1px solid #22222244;
  }
`;

export const TdProduct = styled.td`
  > div {
    display: flex;
    flex-direction: column;
    color: var(--light);
  }
`;

export const TdAmount = styled.td`
  > div {
    width: 8rem;
    height: 2.5rem;
    margin: 0 auto;
  }
`;

export const TdPrice = styled.td`
  text-align: right;
  padding-right: 1.5rem;

  > strong {
    color: var(--light);
  }

  @media (min-width: 33.75rem) {
    font-size: 1.2rem;
  }
`;

export const TdDelete = styled.td`
  text-align: right;

  > svg {
    cursor: pointer;
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (min-width: 35rem) {
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }

  @media (min-width: 40.25rem) {
    padding: 2rem;
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
  box-shadow: 4px 4px 6px rgba(252, 122, 87, 0.75);
`;

export const OrderPrice = styled.strong`
  color: var(--light);
  text-transform: uppercase;
  margin: 1rem 0;

  > strong {
    color: #fcd757;
    font-size: 2rem;
    margin-left: 0.25rem;
  }

  @media (min-width: 35rem) {
    margin: 0;
  }
`;
