import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { OrderComponent } from './supplier/order/order.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [{
  path:'',
  component: InventoryComponent ,
  children:[{
    path : 'product',
    component:ProductsComponent
  },
  {
    path : 'product/add',
    component:EditProductComponent
  },
  {
    path : 'product/:id',
    component:ProductDetailComponent
  },
  {
    path : 'product/:id/edit',
    component:EditProductComponent
  },
  {
    path : 'supplier',
    component:SupplierComponent
  },
  {
    path : 'supplier/:id',
    component:SupplierDetailComponent
  },
  {
    path : 'supplier/:id/order/:orderId',
    component:OrderComponent
  },
  {
    path : 'customer',
    component:CustomerComponent
  },
  {
    path : 'customer/:id',
    component:CustomerComponent
  },
  {
    path : 'billing',
    component: BillingComponent
  },
  {
    path : '',
    redirectTo : 'billing'
  },
  // {
  //   path:'**',
  //   component:ProductsComponent
  // }
]
}];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
