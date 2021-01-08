import { useEffect, useState } from 'react';
import { OrganizationData } from '../organization';

export const useData = (): OrganizationData | undefined => {
  const [organizationData, setOrganizationData] = useState<
    OrganizationData | undefined
  >(undefined);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('DATA/organizations.json', {
        cache: 'no-cache'
      });

      if (response.status < 200 || response.status >= 300) {
        console.error(
          `Loading data failed with status ${response.status} ${response.statusText}`
        );
        return [];
      }
      return await response.json();
    };

    load().then((result) => setOrganizationData(result));
  }, []);

  return organizationData;
};
