import React from 'react';
import { GlobalStyles, theme } from './global-styles';
import { ThemeProvider } from 'styled-components';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>Hello World</h1>
    </ThemeProvider>
  );
}

export default App;
