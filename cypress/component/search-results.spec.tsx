import { mount } from '@cypress/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/client/global-styles';
import { SearchResult } from '../../src/client/use-search';
import { SearchResults } from '../../src/client/search-results';

const mountComponent = (result: SearchResult) => {
  return mount(
    <ThemeProvider theme={theme}>
      <div style={{ margin: '6rem', maxWidth: '105rem' }}>
        <SearchResults searchResult={result} />
      </div>
    </ThemeProvider>
  );
};
describe('SearchResults', () => {
  it('should render 1', () => {
    mountComponent({
      organizations: [{ title: 'Org 1' }, { title: 'Org 2' }]
    } as any);
    cy.screenshot('test-1');
  });

  it('should render 2', () => {
    mountComponent({
      organizations: [{ title: 'Org 1' }, { title: 'Org 2' }]
    } as any);
    cy.screenshot('test-2');
  });
});
