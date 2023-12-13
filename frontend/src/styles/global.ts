import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background:  #121214;
    color: #FFF;

    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3 h4, h5, h6, strong {
    font-weight: 500;
  }

  h1, h2 {
    margin-bottom: 24px;
  }

  label {
    font-size: 0.88rem;
    color: #A8A8B3;

    margin-bottom: 0.5rem;
  }

  button, svg {
    cursor: pointer;
  }
`;
