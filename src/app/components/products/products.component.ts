import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute, 
    productService: ProductService, 
    categoryService: CategoryService) {
    productService.getAll().pipe(switchMap(
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
    
    this.categories$ = categoryService.getAll();
  }

}
