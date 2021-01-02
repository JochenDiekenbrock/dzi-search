import { FC, useState } from 'react';
import { Organization } from '../organization';
import { useSearch } from './useSearch';

export const Main: FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const result = useSearch('deutschland');
  if (organizations.length !== result.length) {
    setOrganizations(result);
  }

  console.log('main.tsx:13: organizations: ', organizations);

  return (
    <ol>
      {organizations &&
        organizations.map((organization) => <li>{organization.url}</li>)}
    </ol>
  );
};
