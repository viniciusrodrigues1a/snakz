import styled from "styled-components";

export const DeletionConfirmationMessage = styled.span`
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
`;

export const UpdateForm = styled.form`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    > input:first-child {
      width: 100%;
    }

    > input:last-child {
      width: 30%;
      margin-right: 0;
    }
  }

  > input,
  > div > input {
    border: 1px solid var(--dark);
    padding: 1rem;
    margin: 1rem;
    height: 4rem;
  }

  > input {
    margin: 0;
    width: 100%;
  }
`;

export const UpdateFormUpload = styled.div`
  position: relative;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  > img {
    width: 4rem;
    height: 4rem;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  > input {
    position: absolute;
    width: 4rem;
    height: 4rem;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.25rem;
    border: 1px solid var(--dark);
  }
`;
