import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Observable<any[]>;
  product: Product = { title: '', price: null, category: '', imageUrl: ''};
  //product: {};
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.categories = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id).subscribe(p => this.product = p);
  }
  
  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this program?')) return; 
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
