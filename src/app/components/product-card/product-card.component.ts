import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product: any;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product){
    let productObj: Product = { 
      title: product.payload.val().title,
      price: product.payload.val().price,
      category: product.payload.val().category,
      imageUrl: product.payload.val().imageUrl,
      key: product.payload.key };
    this.cartService.addToCart(productObj);
  }

}
