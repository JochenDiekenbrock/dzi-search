import { createGlobalStyle } from 'styled-components';

const lightest = '#FFFEFD';
const light = '#FEFCF1';
// const dark = '#FCD030';
const darker = '#C49A03';
const darkest = '#382E0A';

export const theme = {
  primaryDark: darkest,
  primaryLight: lightest,
  primaryLightDarker: light,
  primaryHover: darker
};

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    background: ${({ theme }): any => (theme as any).primaryLight};
    color: ${({ theme }): any => (theme as any).primaryDark};
    height: 100vh;
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  
  textarea, input {
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: ${({ theme }): any => (theme as any).primaryLight};
  }
  
  #root {
    flex-grow: 1;
    max-width: 50rem;
  }
`;
