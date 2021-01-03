import { FC, useState } from 'react';
import { Facets } from './facets';
import { SearchResults } from './search-results';
import { SearchParameter, SearchResult, useSearch } from './use-search';

export const Main: FC = () => {
  const [searchParameter, setSearchParameter] = useState<SearchParameter>({
    searchTerm: ''
  });

  const [searchResult, setSearchResult] = useState<SearchResult>({
    anteilKostenFacets: {},
    ausrichtungFacets: {},
    organizations: []
  });

  useSearch(searchParameter).then((result) => {
    console.log('main.tsx:24: result: ', result);
    if (JSON.stringify(result) !== JSON.stringify(searchResult)) {
      setSearchResult(result);
    }
  });

  return (
    <>
      <h1>Suche nach Hilfsorganisationen mit Spendensiegel</h1>
      <p>
        Erweiterte Suche nach Hilfsorganisationen mit Spendensiegel in der
        Datenbank des <a href="https://www.dzi.de/">DZI</a> (Deutsches
        Zentralinstitut für soziale Fragen)
      </p>
      <div>
        <Facets
          searchParameter={searchParameter}
          searchResult={searchResult}
          onKostenAnteilFacetChanged={(facet) =>
            setSearchParameter({ ...searchParameter, anteilKostenFacet: facet })
          }
          onAusrichtungFacetChanged={(facet) =>
            setSearchParameter({ ...searchParameter, ausrichtungFacet: facet })
          }
        />
      </div>
      <p>
        <label>
          Suche:{' '}
          <input
            type="text"
            onChange={(event) => {
              setSearchParameter({
                ...searchParameter,
                searchTerm: event.target.value
              });
            }}
          />
        </label>
      </p>
      <SearchResults searchResult={searchResult} />
    </>
  );
};
