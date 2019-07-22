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
  @Input('shopping-cart') shoppingCart;
  
  constructor(private cartService: ShoppingCartService) { }


  addToCart(){
    this.cartService.addToCart(this.constructObj());
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.constructObj());
  }

  getQuantity(){
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.payload.key];
    return item ? item.quantity : 0;
  }
  
  private constructObj(){
    let productObj: Product = { 
      title: this.product.payload.val().title,
      price: this.product.payload.val().price,
      category: this.product.payload.val().category,
      imageUrl: this.product.payload.val().imageUrl,
      key: this.product.payload.key };
      return productObj;
  }

}
