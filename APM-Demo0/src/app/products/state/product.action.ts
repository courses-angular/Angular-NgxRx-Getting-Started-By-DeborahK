import {Action} from '@ngrx/store';
import {ToggleAction} from '@ngrx/store-devtools/src/actions';
import {Product} from '../product';

// Create Product Action Types as enum
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product'
}

// Action Creator
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {
  }
}
export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;
  constructor(public payload: Product ) {
  }
}

export class ClearCurrentProduct implements Action {
  readonly type =  ProductActionTypes.ClearCurrentProduct;
}


export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}


export type ProductActions =
  ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct;



