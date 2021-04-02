import styled from "styled-components";

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
