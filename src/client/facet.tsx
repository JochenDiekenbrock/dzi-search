import { FC } from 'react';
import styled from 'styled-components';
import { Facets } from './use-search';

export interface FacetProps {
  title: string;
  facets: Facets;
  onFacetChanged: (facet: string | undefined) => void;
  isFacetSelected: boolean;
}
export const Facet: FC<FacetProps> = ({
  isFacetSelected,
  facets,
  onFacetChanged,
  title
}) => (
  <FacetPane>
    {Object.keys(facets).length && (
      <FacetGrid>
        {title}:
        {Object.keys(facets)
          .sort((a, b) => a.localeCompare(b))
          .map((facet) => (
            <button key={facet} onClick={() => onFacetChanged(facet)}>
              {facet} ({facets[facet]})
            </button>
          ))}
        {isFacetSelected && (
          <button onClick={() => onFacetChanged(undefined)}>Alle</button>
        )}
      </FacetGrid>
    )}
  </FacetPane>
);

const FacetPane = styled.div`
  margin-bottom: 1rem;
`;

const FacetGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
`;
