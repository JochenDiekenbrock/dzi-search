import { FC } from 'react';
import { Facet } from './facet';
import { SearchParameter, SearchResult } from './use-search';

export interface FacetsProps {
  searchParameter: SearchParameter;
  searchResult: SearchResult;
  onAusrichtungFacetChanged: (facet: string | undefined) => void;
  onKostenAnteilFacetChanged: (facet: string | undefined) => void;
}
export const Facets: FC<FacetsProps> = (props) => (
  <>
    <Facet
      title="Ausrichtung"
      facets={props.searchResult.ausrichtungFacets}
      onFacetChanged={props.onAusrichtungFacetChanged}
      isFacetSelected={!!props.searchParameter.ausrichtungFacet}
    />
    <Facet
      title="Kostenanteil"
      facets={props.searchResult.anteilKostenFacets}
      onFacetChanged={props.onKostenAnteilFacetChanged}
      isFacetSelected={!!props.searchParameter.anteilKostenFacet}
    />
  </>
);
