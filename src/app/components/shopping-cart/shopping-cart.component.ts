import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number;
  products: any[] = [];
  total: number = 0;
  cart: any;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = cart.totalItemsCount;
      this.cart = cart;
      for (let productId in cart.items) {
        this.products.push(cart.items[productId]);
        this.total += this.calcPrice(cart.items[productId]);
        console.log(this.total);
      }
    });
  }

  calcPrice(p: any){
    return p.product.price * p.quantity; 
  }

}
