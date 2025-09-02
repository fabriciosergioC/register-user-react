import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

*{
margin: 0;
padding: 0;
box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  font-family: 'Arial', sans-serif;
  overflow-x: hidden;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Responsividade para telas pequenas */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 12px;
  }
}

`;
