import { useEffect, useMemo, useState } from 'react';
import MiniSearch from 'minisearch';
import { Organization } from '../organization';

export const useData = (): Organization[] | undefined => {
  const [organizations, setOrganizations] = useState<
    Organization[] | undefined
  >(undefined);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('DATA/organizations.json');
      console.log('response: ', response);

      if (response.status < 200 || response.status >= 300) {
        console.error(
          `Loading data failed with status ${response.status} ${response.statusText}`
        );
        return [];
      }
      return await response.json();
    };

    load().then((result) => setOrganizations(result));
  }, []);

  // console.log('useSearch.ts: useData: organizations: ', organizations);
  return organizations;
};

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
        prefix: true
      }
    });

    if (organizations) {
      miniSearch.addAll(organizations);
    }
    console.log(`useSearch.ts: ${miniSearch.documentCount} indexed`);
    return miniSearch;
  }, [organizations]);
};

export const useSearch = (searchTerm: string): Promise<Organization[]> => {
  console.log('useSearch.ts, useSearch searchTerm: ', searchTerm);
  const miniSearch = useMiniSearch();
  return new Promise((resolve) => {
    const searchResults = miniSearch.search(searchTerm);
    console.log('useSearch.ts: useSearch: ', searchResults);
    resolve((searchResults as unknown) as Organization[]);
  });
};
