import { FormControl } from '@angular/forms';
import { PaginationConfig } from './../../shared/global/pagination/pagination.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from 'src/app/shared/interfaces/global.interface';
import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export interface Section {
  name: string;
  updated: Date;
}

const productsDate = [{
  id : '1',
  name: 'Product 1',
  category: 'Category 1',
  avgBuyPrice : 12,
  avgSellPrice : 23,
  profitLoss : 34,
  stock: 368457834,
},{
  id : '2',
  name: 'Product 2',
  category: 'Category 2',
  avgBuyPrice : 12,
  avgSellPrice : 23,
  profitLoss : 34,
  stock: 368457834,
}];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {



  showResultPerPage : number[] = [2, 5, 10, 25, 50];

  paginationConfig : PaginationConfig = {
    currentPage : 1,
    totalRecordCount : 7,
    noOfRecordPerPage : this.showResultPerPage[0]
  };

  searchkeyWordSubscription : Subscription;

  searchkeyWord: FormControl = new FormControl();

  products: Product[] = [];

  constructor(private readonly productService: ProductService) { }

  ngOnInit() {
    const response = this.productService.productServiceTest();
    console.log('Response',response);
    this.loadProducts();
    this.searchkeyWordSubscription = this.searchkeyWord.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value =>{
        this.handleSearch();
      })
  }




  ngOnDestroy(){

  }

  calculateTotalStocks(stocks : any[]){
    const initValue = {
      purchaseUnit : 0
    }
    const stockData = stocks.reduce((accumulator, currentValue) => {
      const stock  = {
        purchaseUnit : accumulator.purchaseUnit + currentValue.purchaseUnit,
      };
      return stock;
    }, initValue);
    return stockData;
  }

  loadProducts(){
    this.productService.getProduts(this.paginationConfig).subscribe( response => {
      this.products = response.products.data;
      this.paginationConfig.totalRecordCount = response.products.total;
    });
  }

  handlePageChange(currentPage: number){
    console.log('handle Page Change', currentPage);
    this.paginationConfig = {
      ...this.paginationConfig,
      currentPage
    }
    this.loadProducts();
  }

  handleRecordPerPage(selectRecordPerPage: string){
    console.log('Selcted pp', selectRecordPerPage);
    this.paginationConfig = {
      ...this.paginationConfig, 
      noOfRecordPerPage : Number.parseInt(selectRecordPerPage, 10),
      currentPage : 1
    }
    this.loadProducts();
  }

  handleSearch(){
    console.log('start Searching');
  }

}
