import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { PaginationConfig } from 'src/app/shared/global/pagination/pagination.component';

@Injectable()
export class CustomerService {

  constructor(private readonly apiService : ApiService) { }

  customerServiceTest(){
    return 'From Customer' + this.apiService.testApiService();
  }

  getCustomers(pageConfig: PaginationConfig){
    return this.apiService.getWithParam(pageConfig, 'customers');
  }

  createCustomer(params){
    return this.apiService.postData(params, 'customer/create');
  }

  editCustomer(params){
    return this.apiService.postData(params, `customer/${params.id}/update`);
  }

  getCustomerById(id: string){
    return this.apiService.getWithParam({}, 'customer/' + id);
  }
}
