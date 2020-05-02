import { Customer } from './../../../shared/interfaces/global.interface';
import { CustomerService } from './../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  
  editMode = false;

  //editStockMode = false;

  editCustomerId: string;

  //prductIdForStock: string;

  //categories: Category[];

  customer: Customer;

  //stocks: any = [];

  //currentStock: any;

  customerForm: FormGroup;
  //stockForm: FormGroup;




  title = 'Add Customer';

  constructor(private route: ActivatedRoute, private readonly customerService : CustomerService) { }

  ngOnInit() {
    this.editCustomerId = this.route.snapshot.paramMap.get('id');
    this.initiliseForm();
    if (this.editCustomerId){
      this.title = 'Edit Customer :' + this.editCustomerId;
      this.editMode = true;
      this.loadCustomerDetail();
    }
  }

  initiliseForm(){
    // Product Form 
    this.customerForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      phoneNo: new FormControl(''),
      note:new FormControl('')
    });

    // Product Stock Form
    // this.stockForm = new FormGroup({
    //   id: new FormControl(''),
    //   productId: new FormControl('', [Validators.required]),
    //   purchaseDate: new FormControl(''),
    //   purchaseUnit:  new FormControl(''),
    //   purchasePerUnitCost: new FormControl('')
    // });

  }

  initiliseCustomerFormData(){
    const formData = {
      id: this.customer.id,
      name : this.customer.name,
      phoneNo: this.customer.phoneNo,
      note: this.customer.note
    }
    this.customerForm.patchValue(formData);
  }

  // initiliseProductStockFormData(){
  //   const formData = {
  //     id: this.currentStock ?  this.currentStock.id : '',
  //     productId : this.currentStock ? this.currentStock.product_id : this.product.id,
  //     purchaseDate: this.currentStock ? (new Date(this.currentStock.purchaseDate)).toISOString().substring(0,10) : '',
  //     purchaseUnit: this.currentStock ?  this.currentStock.purchaseUnit : '',
  //     purchasePerUnitCost: this.currentStock ? this.currentStock.purchasePerUnitCost : ''
  //   }
  //   this.stockForm.patchValue(formData);
  // }

  // loadCategoryDropDown(){
  //   this.productService.getCatgories().subscribe(response => {
  //     this.categories = response.categories;
  //   });
  // }

  loadCustomerDetail(){
    this.customerService.getCustomerById(this.editCustomerId).subscribe(response => {
      this.customer =  response.customer[0];
      // this.product = response.product[0];
      // this.stocks = response.product[0].stocks;
      this.initiliseCustomerFormData();
      // this.initiliseProductStockFormData();
    });
  }
  

  // editStock(stock: any){
  //   this.currentStock = stock;
  //   this.editStockMode = true;
  //   this.initiliseProductStockFormData();
  // }

  handleCustomerSubmit(){
    console.log('Customer is Submit', this.customerForm.value);
    const formValue = this.customerForm.value;
    if(this.editMode){
      this.customerService.editCustomer(formValue).subscribe(response => {
        this.loadCustomerDetail();
      });
    } else{
      this.customerService.createCustomer(formValue).subscribe(response => {
        console.log('Getteing response',response);
        //this. = response.product.id;
        this.loadCustomerDetail();
      });
    }
  }

  // handleStockSubmit(){
  //   if (this.stockForm.valid) {
  //     const formValue =  this.stockForm.value;
  //     if (this.editStockMode){
  //       this.productService.editProductStock(formValue).subscribe(response => {
  //         console.log(response);
  //         this.loadProductDetail();
  //       });
  //     } else{
  //       this.productService.createProductStock(formValue).subscribe(response => {
  //         console.log(response);
  //         this.loadProductDetail();
  //       });
  //     }
  //   } else {
  //     console.log('Error in Product Stock Submit',this.stockForm.value);
  //   }
  // }

}
