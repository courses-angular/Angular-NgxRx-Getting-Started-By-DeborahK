import {Component, OnInit, OnDestroy} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';

import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  componentActive: boolean = true;
  private products$: Observable<Product[]>;
  private errorMessage$: Observable<string>;


  constructor(private productService: ProductService, private store: Store<fromProduct.State>) {
  }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );
    // TODO: Unsubscribe
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct);


    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: (err: any) => this.errorMessage = err.error
    // });
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());
      // takeWhile(() => this.componentActive))
      // .subscribe((products: Product[]) => this.products = products);

    // TODO: Unsubscribe this sub
    // this.store.pipe(select('products')).subscribe(
    //   state => this.displayCode = state.showProductCode
    // );

    //  Use custom selector from reducer
    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      code => this.displayCode = code
    );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    // this.store.dispatch({
    //   type: 'TOGGLE_PRODUCT_CODE',
    //   payload: value
    // });

    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());

  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
