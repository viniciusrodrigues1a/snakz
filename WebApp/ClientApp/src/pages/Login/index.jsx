import React, { useState, useRef, useEffect, useContext } from "react";
import { IoPerson, IoLockClosed, IoArrowForwardOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

import LoadingSpin from "../../components/LoadingSpin";

import { UserContext } from "../../contexts/UserContext";

import {
  Container,
  Form,
  AdminIcon,
  InputContainer,
  Input,
  InputPlaceholder,
  SubmitButton,
  ErrorMessage,
} from "./styles";

let feedbackTimeout;

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isUserInputActive, setIsUserInputActive] = useState(false);
  const [isPassInputActive, setIsPassInputActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [feedback, setFeedback] = useState({});
  const feedbackRef = useRef(null);
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn, hasContextMounted } = useContext(
    UserContext
  );

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/admin/produtos");
    }
  }, [isLoggedIn, history]);

  async function handleSubmit(e) {
    e.preventDefault();
    clearTimeout(feedbackTimeout);

    if (user === "" || pass === "") {
      showError("Campos não podem estar vazios!");
      return;
    }

    const formData = new FormData();
    formData.append("username", user);
    formData.append("password", pass);

    const response = await fetch("/sessions", {
      body: formData,
      method: "post",
    });

    if (response.status === 400) {
      const json = await response.json();
      showError(json.message);
      return;
    }

    if (response.status === 200) {
      handleSuccess();
      return;
    }

    showError("Algo deu errado.");
  }

  function showError(message) {
    clearTimeout(feedbackTimeout);
    setFeedback({ message, color: "rgba(162, 78, 78, 1)" });
    feedbackTimeout = setTimeout(() => setFeedback({}), 2000);
  }

  function handleSuccess() {
    setIsButtonDisabled(true);
    setFeedback({ message: "Redirecionando em 3", color: "#4ea24e " });
    setTimeout(
      () => setFeedback({ message: "Redirecionando em 2", color: "#4ea24e " }),
      1000
    );
    setTimeout(
      () => setFeedback({ message: "Redirecionando em 1", color: "#4ea24e " }),
      2000
    );
    setTimeout(
      () => setFeedback({ message: "Redirecionando...", color: "#4ea24e " }),
      3000
    );
    setTimeout(() => setIsLoggedIn(true), 3500);
  }

  if (!hasContextMounted) {
    return (
      <div style={{ paddingTop: "2rem" }}>
        <div style={{ marginTop: "2rem" }}>
          <LoadingSpin />
        </div>
      </div>
    );
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
            required
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
            required
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

        <SubmitButton onClick={handleSubmit} disabled={isButtonDisabled}>
          Entrar
          <IoArrowForwardOutline size={24} color="#fff" />
        </SubmitButton>

        <ErrorMessage ref={feedbackRef} color={feedback.color}>
          {feedback.message}
        </ErrorMessage>
      </Form>
    </Container>
  );
}

export default Login;
