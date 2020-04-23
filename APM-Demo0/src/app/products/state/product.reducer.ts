import {Product} from '../product';
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductActions, ProductActionTypes} from './product.action';

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
export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: {...action.payload}
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
    default: {
      return state;
    }

  }
}
