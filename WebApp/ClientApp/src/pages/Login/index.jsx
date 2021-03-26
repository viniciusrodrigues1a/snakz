import React, { useState } from "react";
import { IoPerson, IoLockClosed, IoArrowForwardOutline } from "react-icons/io5";

import {
  Container,
  Form,
  AdminIcon,
  InputContainer,
  Input,
  InputPlaceholder,
  SubmitButton,
} from "./styles";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isUserInputActive, setIsUserInputActive] = useState(false);
  const [isPassInputActive, setIsPassInputActive] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <Form>
        <AdminIcon>
          <IoPerson size={48} color="#ccc" />
          <IoLockClosed size={20} color="rgba(162, 78, 78, 1)" />
        </AdminIcon>

        <InputContainer>
          <Input
            type="text"
            onFocus={() => setIsUserInputActive(true)}
            onBlur={() => user === "" && setIsUserInputActive(false)}
            value={user}
            onChange={e => setUser(e.target.value)}
            isValid={user !== ""}
          />
          <InputPlaceholder isActive={isUserInputActive}>
            Usuário
          </InputPlaceholder>
        </InputContainer>

        <InputContainer>
          <Input
            type="password"
            onFocus={() => setIsPassInputActive(true)}
            onBlur={() => pass === "" && setIsPassInputActive(false)}
            value={pass}
            onChange={e => setPass(e.target.value)}
            isValid={pass !== ""}
          />
          <InputPlaceholder isActive={isPassInputActive}>
            Senha
          </InputPlaceholder>
        </InputContainer>

        <SubmitButton onClick={handleSubmit}>
          Entrar
          <IoArrowForwardOutline size={24} color="#fff" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Login;
