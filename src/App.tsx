import React from 'react';
import { GlobalStyles, theme } from './client/global-styles';
import { ThemeProvider } from 'styled-components';
import { Main } from './client/main';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Main />
    </ThemeProvider>
  );
}

export default App;
