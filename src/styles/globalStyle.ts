import { createGlobalStyle } from "styled-components";
import type { DefaultTheme } from "styled-components";

// Extend DefaultTheme to include appSkeletonFrom and appSkeletonTo
declare module "styled-components" {
  export interface DefaultTheme {
    appbackground?: string;
    appcolor?: string;
    appSkeletonFrom?: string;
    appSkeletonTo?: string;
    // add other theme properties as needed
  }
}

export function pxToRem(px: number): import("styled-components").Interpolation<{ theme?: DefaultTheme }> {
  return `${px / 16}rem`;
}

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

  .skeleton-loading{
      animation: skeleton-loading 2s infinite alternate;
  }
@keyframes skeletonLoading {
    from{
        background-color: ${(props) =>props.theme.appSkeletonFrom};
    }
        to {
        background-color: ${(props) => props.theme.appSkeletonTo};
   }
}
  .skeleton-loading-mh-1 {
    min-heigth: ${pxToRem(175)};
  }
    .skeleton-loading-mh-2 {
    min-heigth: ${pxToRem(400)};
  }
`;

