import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'inventory',
       // component:HomeComponent
        //loadChildren : './home/home.module#HomeModule'
        loadChildren : () => import('./inventory/inventory.module').then(m=>m.InventoryModule)
      },
      // {
      //   path:'dashboard',
      //  // component:HomeComponent
      //   //loadChildren : './dashboard/dashboard.module#DashboardModule',
      //   loadChildren :  () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
      // },
      {
        path:'**',
        redirectTo:'/inventory/billing',
        pathMatch:'full'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
