import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  padding-bottom: 18rem;
`;

export const Form = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.3rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  position: relative;

  & + & {
    margin-top: 1.25rem;
  }
`;

export const Input = styled.input`
  padding: 0.75rem 1.5rem;
  border: 1px solid #ddd;
  transition: 0.2s;

  &:focus {
    outline: 0;
    border: 1px solid #aaa;
  }

  &:valid {
    ${({ isValid }) =>
      isValid &&
      css`
        border-left: 2px solid #4ea24e;
      `};
  }
`;

const inputPlaceholder = css`
  top: 50%;
  font-size: 1.15rem;
  background-color: transparent;
`;

const inputPlaceholderActive = css`
  top: 0%;
  font-size: 1rem;
  background-color: #fff;
`;

export const InputPlaceholder = styled.span`
  position: absolute;
  pointer-events: none;
  transform: translateY(-50%);
  left: 1.5rem;
  color: #777;
  letter-spacing: 0.05rem;
  transition: 0.2s;

  ${({ isActive }) => (isActive ? inputPlaceholderActive : inputPlaceholder)};
`;

export const AdminIcon = styled.div`
  display: inline-block;
  position: relative;
  width: 48px;
  height: 48px;
  margin: 0 auto 2rem;

  > svg:first-child {
    position: absolute;
    top: 0;
    left: 0;
  }

  > svg:last-child {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 2rem;
  border: 0;
  background-color: #4ea24e;
  color: #fff;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-size: 1.15rem;
  letter-spacing: 0.05rem;
  font-weight: 500;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #469146;
  }
`;
