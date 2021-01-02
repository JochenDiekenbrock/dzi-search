import { FC, useState } from 'react';
import styled from 'styled-components';
import { useData } from './use-data';
import { useSearch } from './use-search';

interface Ausrichtungen {
  [ausrichtung: string]: number;
}
interface Ausrichtungen1 {
  [ausrichtung: string]: number;
}

export interface FacetsProps {
  searchTerm: string;
  ausrichtungFacet?: string;
  onAusrichtungFacetChanged: (facet: string | undefined) => void;
}
export const Facets: FC<FacetsProps> = (props) => {
  const [ausrichtungen, setAusrichtungen] = useState<Ausrichtungen>({});
  const allOrgs = useData();

  useSearch({
    searchTerm: props.searchTerm,
    ausrichtungFacet: props.ausrichtungFacet
  }).then((result) => {
    console.log('facets.tsx:22: : ', props.searchTerm, props.ausrichtungFacet);
    if (result.length === 0) {
      result = allOrgs || [];
    }

    const newAusrichtungen: Ausrichtungen = {};
    result.forEach((org) => {
      const ausrichtung = org.weltanschaulicheAusrichtung;
      if (ausrichtung) {
        if (newAusrichtungen[ausrichtung]) {
          newAusrichtungen[ausrichtung]++;
        } else {
          newAusrichtungen[ausrichtung] = 1;
        }
      }
    });
    console.log('facets.tsx:34: newAusrichtungen: ', newAusrichtungen);

    if (JSON.stringify(newAusrichtungen) !== JSON.stringify(ausrichtungen)) {
      setAusrichtungen(newAusrichtungen);
    }
  });

  return (
    <>
      <div>
        Ausrichtungen:
        {Object.keys(ausrichtungen).length && (
          <FacetGrid>
            {Object.keys(ausrichtungen).map((ausrichtung) => (
              <a
                href="#"
                key={ausrichtung}
                onClick={() => props.onAusrichtungFacetChanged(ausrichtung)}
              >
                {ausrichtung} ({ausrichtungen[ausrichtung]})
              </a>
            ))}
            {props.ausrichtungFacet && (
              <a
                href="#"
                onClick={() => props.onAusrichtungFacetChanged(undefined)}
              >
                Alle
              </a>
            )}
          </FacetGrid>
        )}
      </div>
    </>
  );
};

const FacetGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
`;
