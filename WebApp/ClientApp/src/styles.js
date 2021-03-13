import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: 0.05rem;
  font-family: 'Montserrat', sans-serif;

  :root {
    --light: #eeeeee;
    --dark: #222222;
    --orange: #FC7A57;
    --dark-red: #962F2F;
    --underlined-highlight: rgba(186, 80, 39, 0.5);
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background-color: var(--light);
  }

  body,
  input,
  button {
    font-family: 'Montserrat', sans-serif;
    font-size: 100%;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    letter-spacing: 0.05rem;
    font-family: 'Montserrat', sans-serif;
    color: inherit;
  }

  a:hover {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
