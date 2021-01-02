import { useMemo } from 'react';
import MiniSearch from 'minisearch';
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

export const useSearch = (searchParam: {
  searchTerm: string;
  ausrichtungFacet?: string;
}): Promise<Organization[]> => {
  console.log('useSearch.ts, useSearch searchParam: ', searchParam);
  const miniSearch = useMiniSearch();
  return new Promise((resolve) => {
    const searchResults = miniSearch.search(searchParam.searchTerm || '', {
      filter: (result) => {
        const found =
          !searchParam.ausrichtungFacet ||
          searchParam.ausrichtungFacet === result.weltanschaulicheAusrichtung;
        // console.log(
        //   'use-search.ts:46: result, found: ',
        //   result.weltanschaulicheAusrichtung,
        //   found
        // );
        return found;
      }
    });
    console.log('useSearch.ts: searchResults: ', searchResults);
    resolve((searchResults as unknown) as Organization[]);
  });
};
