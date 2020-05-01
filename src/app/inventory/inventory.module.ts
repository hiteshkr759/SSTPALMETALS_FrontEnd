import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { OrderComponent } from './supplier/order/order.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductService } from './products/service/product.service';
import { BillingComponent } from './billing/billing.component';
import { ProductSearchComponent } from './billing/product-search/product-search.component';
import { CustomerSearchComponent } from './billing/customer-search/customer-search.component';
import { CartListComponent } from './billing/cart-list/cart-list.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  declarations: [
    InventoryComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductDetailComponent,
    SupplierComponent,
    SupplierDetailComponent,
    OrderComponent,
    EditProductComponent,
    BillingComponent,
    ProductSearchComponent,
    CustomerSearchComponent,
    CartListComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InventoryRoutingModule
  ],
  providers:[ProductService]
})
export class InventoryModule { }
