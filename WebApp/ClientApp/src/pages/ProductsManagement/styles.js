import styled from "styled-components";

export const AddProduct = styled.div`
  margin-top: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    width: 3rem;
    height: 3rem;
    border: 0;
    border-radius: 50%;
    background-color: #4ea24e;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  }
`;

export const ProductForm = styled.form`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;

    > input:first-child {
      width: 100%;
    }

    > input:last-child {
      width: 30%;
      margin-right: 0;
    }
  }

  > input {
    margin: 0;
    width: 100%;
  }
`;

export const FormInput = styled.input`
  border: 1px solid var(--dark);
  padding: 1rem;
  margin: 1rem;
  height: 4rem;
`;

export const ProductFormUpload = styled.div`
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
