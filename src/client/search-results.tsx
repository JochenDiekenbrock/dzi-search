import { FC, useState } from 'react';
import styled from 'styled-components';
import { Organization } from '../organization';
import { useSearch } from './use-search';

export interface SearchResultsProps {
  searchTerm: string;
  ausrichtungFacet?: string;
}
export const SearchResults: FC<SearchResultsProps> = (props) => {
  const [searchResults, setSearchResults] = useState<Organization[]>([]);

  console.log('search-results.tsx:13: props: ', props);

  useSearch({
    searchTerm: props.searchTerm,
    ausrichtungFacet: props.ausrichtungFacet
  }).then((result) => {
    const searchResultsHaveChanged = searchResults.length !== result.length;

    if (searchResultsHaveChanged) {
      setSearchResults(result);
    }
  });

  console.log('search-results.tsx:24: searchResults: ', searchResults);

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
