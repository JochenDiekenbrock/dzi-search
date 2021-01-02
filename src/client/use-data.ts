import { useEffect, useState } from 'react';
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
