/** @jsxRuntime classic */
/** @jsx h */
import {
  AutocompleteComponents,
  AutocompletePlugin,
  getAlgoliaFacets,
} from '@algolia/autocomplete-js';
import { h } from 'preact';

import { GridIcon } from '../components';
import { ALGOLIA_PRODUCTS_INDEX_NAME } from '../constants';
import { searchClient } from '../searchClient';
import { CategoryHit } from '../types';

export const categoriesPlugin: AutocompletePlugin<CategoryHit, {}> = {
  getSources({ query }) {
    if (!query) {
      return [];
    }

    return [
      {
        sourceId: 'categoriesPlugin',
        getItems() {
          return getAlgoliaFacets({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                facet: 'flat_category',
                params: {
                  facetQuery: query,
                  maxFacetHits: 2,
                },
              },
            ],
          });
        },
        getItemInputValue({ item }) {
          return item.label;
        },
        templates: {
          item({ item, components }) {
            return <CategoriesItem hit={item} components={components} />;
          },
        },
      },
    ];
  },
};

type CategoriesItemProps = {
  hit: CategoryHit;
  components: AutocompleteComponents;
};

function CategoriesItem({ hit, components }: CategoriesItemProps) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <GridIcon />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.ReverseHighlight hit={hit} attribute="label" />
          </div>
        </div>
      </div>
    </div>
  );
}
