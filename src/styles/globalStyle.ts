import { createGlobalStyle } from "styled-components";
import type { DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ theme?: DefaultTheme }>`
body, html {
    background: ${(props) => props.theme?.appbackground};
    color: ${(props) => props.theme?.appcolor};
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;   
}
  h1, h2, p, ul, li, figure {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .mb-1 {
      margin-bottom: ${pxToRem(16)} ; 
  }
  
  .mb-2 {
       argin-bottom: ${pxToRem(32)};
  }
`;