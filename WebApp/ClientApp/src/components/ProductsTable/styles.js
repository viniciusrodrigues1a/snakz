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

export const Content = styled.div`
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

export const TdAction = styled.td`
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
