import { debounceTime } from 'rxjs/operators';
import { CustomerService } from './service/customer.service';
import { Customer } from './../../shared/interfaces/global.interface';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PaginationConfig } from 'src/app/shared/global/pagination/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  showResultPerPage: number[] = [2, 5, 10, 25, 50];

  paginationConfig: PaginationConfig = {
    currentPage : 1,
    totalRecordCount : 7,
    noOfRecordPerPage : this.showResultPerPage[0]
  };

  searchkeyWordSubscription : Subscription;

  searchkeyWord: FormControl = new FormControl();

  customers: Customer[] = [];

  constructor(private readonly customerService: CustomerService ) { }

  ngOnInit() {
    this.loadCustomers();
    this.searchkeyWordSubscription = this.searchkeyWord.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value =>{
        // this.loadProducts();
        this.handleSearch();
      })
  }



  // ngOnDestroy(){

  // }

  // calculateTotalStocks(stocks : any[]){
  //   const initValue = {
  //     purchaseUnit : 0
  //   }
  //   const stockData = stocks.reduce((accumulator, currentValue) => {
  //     const stock  = {
  //       purchaseUnit : accumulator.purchaseUnit + currentValue.purchaseUnit,
  //     };
  //     return stock;
  //   }, initValue);
  //   return stockData;
  // }

  loadCustomers(){
    const productParams = {
      ...this.paginationConfig,
      searchkeyWord : this.searchkeyWord.value ? this.searchkeyWord.value : ''
    }
    this.customerService.getCustomers(productParams).subscribe( response => {
      this.customers = response.customers.data;
      this.paginationConfig.totalRecordCount = response.customers.total;
    });
  }

  handlePageChange(currentPage: number){
    this.paginationConfig = {
      ...this.paginationConfig,
      currentPage
    }
    this.loadCustomers();
  }

  handleRecordPerPage(selectRecordPerPage: string){
    this.paginationConfig = {
      ...this.paginationConfig, 
      noOfRecordPerPage : Number.parseInt(selectRecordPerPage, 10),
      currentPage : 1
    }
    this.loadCustomers();
  }

  handleSearch(){
    console.log('start Searching');
    this.paginationConfig.currentPage = 1;
    this.loadCustomers();
  }

}
