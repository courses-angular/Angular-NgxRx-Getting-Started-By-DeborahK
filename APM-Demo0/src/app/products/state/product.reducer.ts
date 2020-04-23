import {Product} from '../product';
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends fromRoot.AppState {
  products: ProductState;
}


export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  currentProductId: number,
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: 3,
  products: []
};

// Create selector for all Product state
const getProductFeatureState = createFeatureSelector<ProductState>('products');
// Create selector for 'ShowProductCode' only
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   state => state.currentProduct
// );
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);
// Composing selectors
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    state.products.find(product => product.id === currentProductId)
  }
);

// Create reducer
export function reducer(state: ProductState = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}
