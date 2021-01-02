import { FC, useState } from 'react';
import styled from 'styled-components';
import { Organization } from '../organization';
import { useSearch } from './useSearch';

export interface SearchResultsProps {
  searchTerm: string;
}
export const SearchResults: FC<SearchResultsProps> = (props) => {
  const [searchResults, setSearchResults] = useState<Organization[]>([]);

  useSearch(props.searchTerm).then((result) => {
    const searchResultsHaveChanged = searchResults.length !== result.length;

    if (searchResultsHaveChanged) {
      setSearchResults(result);
    }
  });

  return (
    <>
      <div>
        {searchResults &&
          searchResults.map((organization) => (
            <OrganizationLine key={organization.url}>
              <a href={organization.url}>{organization.title}</a>
            </OrganizationLine>
          ))}
      </div>
    </>
  );
};

const OrganizationLine = styled.div`
  margin-bottom: 1rem;
`;
