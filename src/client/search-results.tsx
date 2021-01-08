import { FC } from 'react';
import styled from 'styled-components';
import { SearchResult } from './use-search';

export interface SearchResultsProps {
  searchResult: SearchResult;
}
export const SearchResults: FC<SearchResultsProps> = (props) => (
  <div>
    {props.searchResult.organizations &&
      props.searchResult.organizations.map((organization) => (
        <OrganizationLine key={organization.url}>
          <a target="_blank" rel="noreferrer noopener" href={organization.url}>
            {organization.title}
          </a>
        </OrganizationLine>
      ))}
  </div>
);

const OrganizationLine = styled.div`
  margin-bottom: 1rem;
`;
