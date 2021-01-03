import { useMemo } from 'react';
import MiniSearch, { SearchResult as MsSearchResult } from 'minisearch';
import { Organization } from '../organization';
import { useData } from './use-data';

const useMiniSearch = (): MiniSearch<Organization> => {
  const organizations = useData();
  // console.log('useSearch.ts:useMiniSearch called');

  return useMemo(() => {
    const miniSearch = new MiniSearch<Organization>({
      fields: ['title', 'volltext'],
      idField: 'url',
      storeFields: [
        'title',
        'url',
        'weltanschaulicheAusrichtung',
        'finanzen',
        'volltext'
      ],
      searchOptions: {
        prefix: true,
        fuzzy: 0.2
      }
    });

    if (organizations) {
      miniSearch.addAll(organizations);
    }
    console.log(`useSearch.ts: ${miniSearch.documentCount} indexed`);
    return miniSearch;
  }, [organizations]);
};

export interface SearchParameter {
  searchTerm: string;
  ausrichtungFacet?: string;
  anteilKostenFacet?: string;
}

const calculateFacets = (
  organizations: Organization[],
  facet: 'Ausrichtung' | 'AnteilKosten'
): Facets => {
  const facets: { [facet: string]: number } = {};
  organizations.forEach((org) => {
    const value =
      facet === 'Ausrichtung'
        ? org.weltanschaulicheAusrichtung
        : org.finanzen?.anteilKosten;
    if (value) {
      if (facets[value]) {
        facets[value]++;
      } else {
        facets[value] = 1;
      }
    }
  });
  return facets;
};

const filterFacets = (
  result: MsSearchResult,
  ausrichtungFacet?: string,
  anteilKostenFacet?: string
): boolean => {
  const isAusrichtungFacet =
    !ausrichtungFacet ||
    ausrichtungFacet === result.weltanschaulicheAusrichtung;
  const isAnteilKostenFacet =
    !anteilKostenFacet || anteilKostenFacet === result.finanzen?.anteilKosten;
  const match = isAusrichtungFacet && isAnteilKostenFacet;
  console.log(
    'use-search.ts:46: result, match: ',
    result.weltanschaulicheAusrichtung,
    match
  );
  return match;
};

export interface Facets {
  [facet: string]: number;
}
export interface SearchResult {
  organizations: Organization[];
  ausrichtungFacets: Facets;
  anteilKostenFacets: Facets;
}
export const useSearch = (
  searchParam: SearchParameter
): Promise<SearchResult> => {
  console.log('useSearch.ts, useSearch searchParam: ', searchParam);
  const miniSearch = useMiniSearch();
  const allOrganizations = useData() || [];
  return new Promise((resolve) => {
    const organizations = (miniSearch.search(searchParam.searchTerm || '', {
      filter: (result) =>
        filterFacets(
          result,
          searchParam.ausrichtungFacet,
          searchParam.anteilKostenFacet
        )
    }) as unknown) as Organization[];

    const facetOrgs =
      organizations.length > 0 ? organizations : allOrganizations;
    const anteilKostenFacets = calculateFacets(facetOrgs, 'AnteilKosten');
    const ausrichtungFacets = calculateFacets(facetOrgs, 'Ausrichtung');
    const result: SearchResult = {
      organizations,
      anteilKostenFacets,
      ausrichtungFacets
    };

    console.log('useSearch.ts: result: ', result);
    resolve(result);
  });
};
