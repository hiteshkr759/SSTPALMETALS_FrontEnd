import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { of } from 'rxjs';
import { PaginationConfig } from 'src/app/shared/global/pagination/pagination.component';

@Injectable()
export class ProductService {

  constructor(private readonly apiService : ApiService) { }

  productServiceTest(){
    return 'From Product' + this.apiService.testApiService();
  }

  getCatgories(){
    return this.apiService.getWithParam({}, 'categories');
  }

  getProduts(pageConfig: PaginationConfig){
    return this.apiService.getWithParam(pageConfig, 'products');
  }

  createProduct(params){
    return this.apiService.postData(params, 'product/create');
  }

  editProduct(params){
    return this.apiService.postData(params, `product/${params.id}/update`);
  }

  createProductStock(params){
    return this.apiService.postData(params, `product/${params.productId}/stock/create`);
  }

  editProductStock(params){
    return this.apiService.postData(params, `product/stock/${params.id}/update`);

  }

  getProductById(id: string){
    console.log('Loading Product Detail');
    return this.apiService.getWithParam({}, 'product/' + id);
    // return of({
    //   id : '1',
    //   name: 'Product 1',
    //   category: 'Category 1',
    //   avgBuyPrice : 12,
    //   avgSellPrice : 23,
    //   profitLoss : 34,
    //   stock: 368457834,
    // });
  }

}
