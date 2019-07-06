import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { AngularFireAction } from 'angularfire2/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private productService: ProductService) { 
    this.products = this.productService.getAll();
  }

  ngOnInit() {
  }

}
