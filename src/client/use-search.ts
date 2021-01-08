import MiniSearch, { SearchResult as MsSearchResult } from 'minisearch';
import { useMemo } from 'react';
import { Organization } from '../organization';
import { useData } from './use-data';

const useMiniSearch = (): MiniSearch<Organization> => {
  const organizations = useData();

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
      miniSearch.addAll(organizations.organizations);
    }
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
  selectedFacet: string | undefined,
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

  if (selectedFacet) {
    return { [selectedFacet]: facets[selectedFacet] };
  }

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
  return isAusrichtungFacet && isAnteilKostenFacet;
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
  const miniSearch = useMiniSearch();
  const organizationData = useData();
  return new Promise((resolve) => {
    const MATCH_ALL = 'Arbeitsschwerpunkte';

    const organizations = (miniSearch.search(
      searchParam.searchTerm || MATCH_ALL,
      {
        filter: (result) =>
          filterFacets(
            result,
            searchParam.ausrichtungFacet,
            searchParam.anteilKostenFacet
          )
      }
    ) as unknown) as Organization[];

    const facetOrgs =
      organizations.length > 0
        ? organizations
        : organizationData?.organizations ?? [];
    const anteilKostenFacets = calculateFacets(
      facetOrgs,
      searchParam.anteilKostenFacet,
      'AnteilKosten'
    );
    const ausrichtungFacets = calculateFacets(
      facetOrgs,
      searchParam.ausrichtungFacet,
      'Ausrichtung'
    );
    const result: SearchResult = {
      organizations,
      anteilKostenFacets,
      ausrichtungFacets
    };

    resolve(result);
  });
};
