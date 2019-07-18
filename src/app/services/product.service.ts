import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAllToGetKey() {
    return this.db.list('/products', ref => ref.orderByChild('name')).snapshotChanges();
  }

  getAll() {
    return this.db.list('/products', ref => ref.orderByChild('name')).valueChanges();
  }

  getProduct(productId): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges().pipe(take(1));
  }

  update(productId, product){
    this.db.object('/products/' + productId).update(product); 
  }

  delete(productId){
    this.db.object('/products/' + productId).remove();
  }
}
