import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import * as productActions from './product.action';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Product} from '../product';
import {LoadFail} from './product.action';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    switchMap((action: productActions.Load) => this.productService.getProducts().pipe(
      map((products: Product[]) => new productActions.LoadSuccess(products)),
      catchError(err => of(new LoadFail(err)))
    ))
  );
  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    switchMap((product: Product) => this.productService.updateProduct(product).pipe(
      map((updatedProduct: Product) => new productActions.UpdateProductSuccess(updatedProduct)),
      catchError(err => of(new productActions.UpdateProductFail(err)))
    ))
  );
  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    switchMap((productId) => this.productService.deleteProduct(productId).pipe(
      map(() => new productActions.DeleteProductSuccess(productId)),
      catchError(err => of(new productActions.DeleteProductFail(err)))
    ))
  );
  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    switchMap((product: Product) => this.productService.createProduct(product).pipe(
      map((newProduct) => new productActions.CreateProductSuccess(newProduct)),
      catchError(err => of(new productActions.CreateProductFail(err)))
    ))
  );

}
