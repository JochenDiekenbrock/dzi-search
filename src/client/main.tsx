import { FC, useEffect, useState } from 'react';
import { Organization } from '../organization';
import { SearchResults } from './search-results';
import { useData, useSearch } from './useSearch';

export const Main: FC = () => {
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const allOrgs = useData();
  useEffect(() => {
    console.log('main.tsx:17: : ');
    setAllOrganizations(allOrgs || []);
  }, [allOrgs]);

  console.log(
    'main.tsx:22: allOrganizations.length: ',
    allOrganizations.length
  );

  return (
    <>
      <h1>Suche nach Hilfsorganisationen mit Spendensiegel</h1>
      <p>
        Erweiterte Suche nach Hilfsorganisationen mit Spendensiegel in der
        Datenbank des <a href="https://www.dzi.de/">DZI</a> (Deutsches
        Zentralinstitut für soziale Fragen)
      </p>
      <p>
        <label>
          Suche:{' '}
          <input
            type="text"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </label>
      </p>
      <SearchResults searchTerm={searchTerm} />
    </>
  );
};
