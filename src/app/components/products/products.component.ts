import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[];
  category: string;
  cart: any;
  subscription: Subscription;
  
  constructor(
    route: ActivatedRoute, 
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) 
    {
      productService.getAllToGetKey().pipe(switchMap(
        products => {
          this.products = products;
          return route.queryParamMap;
        }
      )).subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.payload.val().category === this.category) :
          this.products;
    });
    
  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
    .valueChanges().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
