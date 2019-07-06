import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProductsComponent } from './adminComponents/admin-products/admin-products.component';
import { AdminOrdersComponent } from './adminComponents/admin-orders/admin-orders.component';
import { AngularFireAuth } from 'angularfire2/auth';  
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MyordersComponent } from './components/myorders/myorders.component';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductService } from './services/product.service';
import { ProductFormComponent } from './adminComponents/product-form/product-form.component';
import { CategoryService } from './services/category.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: MyordersComponent, canActivate: [AuthGuardService] },
  
  { 
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuard] 
  },
  { 
    path: 'admin/products/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuard] 
  },
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuardService, AdminAuthGuard] 
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuardService, AdminAuthGuard] 
  },

  //{ path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    MyordersComponent,
    ProductFormComponent
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    CustomFormsModule 
  ],
  providers: [AngularFireAuth, 
    AuthService, 
    AuthGuardService, 
    UserService,
    AdminAuthGuard,
    ProductService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
