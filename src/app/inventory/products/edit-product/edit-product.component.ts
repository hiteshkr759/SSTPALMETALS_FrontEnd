import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product, Category } from 'src/app/shared/interfaces/global.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editMode = false;

  editStockMode = false;

  editProductId: string;

  prductIdForStock: string;

  categories: Category[];

  product: Product;

  stocks: any = [];

  currentStock: any;

  productForm: FormGroup;
  stockForm: FormGroup;




  title = 'Add Product';

  constructor(private route: ActivatedRoute, private readonly productService : ProductService) { }

  ngOnInit() {
    this.editProductId = this.route.snapshot.paramMap.get('id');
    this.loadCategoryDropDown();
    this.initiliseForm();
    if (this.editProductId){
      this.title = 'Edit Product :' + this.editProductId;
      this.editMode = true;
      this.loadProductDetail();
    }
  }

  initiliseForm(){
    // Product Form 
    this.productForm = new FormGroup({
      id: new FormControl(''),
      categoryId: new FormControl(''),
      name: new FormControl(''),
      unit: new FormControl(''),
      note: new FormControl(''),
      isActive : new FormControl(true)
    });

    // Product Stock Form
    this.stockForm = new FormGroup({
      id: new FormControl(''),
      productId: new FormControl('', [Validators.required]),
      purchaseDate: new FormControl(''),
      purchaseUnit:  new FormControl(''),
      purchasePerUnitCost: new FormControl('')
    });

  }

  initiliseProductFormData(){
    const formData = {
      id: this.product.id,
      categoryId : this.product.category_id,
      name : this.product.name,
      unit: this.product.unit,
      note: this.product.note,
      isActive : this.product.is_active
    }
    this.productForm.patchValue(formData);
  }

  initiliseProductStockFormData(){
    const formData = {
      id: this.currentStock ?  this.currentStock.id : '',
      productId : this.currentStock ? this.currentStock.product_id : this.product.id,
      purchaseDate: this.currentStock ? (new Date(this.currentStock.purchaseDate)).toISOString().substring(0,10) : '',
      purchaseUnit: this.currentStock ?  this.currentStock.purchaseUnit : '',
      purchasePerUnitCost: this.currentStock ? this.currentStock.purchasePerUnitCost : ''
    }
    this.stockForm.patchValue(formData);
  }

  loadCategoryDropDown(){
    this.productService.getCatgories().subscribe(response => {
      this.categories = response.categories;
    });
  }

  loadProductDetail(){
    this.productService.getProductById(this.editProductId).subscribe(response => {
      this.product = response.product[0];
      this.stocks = response.product[0].stocks;
      this.initiliseProductFormData();
      this.initiliseProductStockFormData();
    });
  }
  

  editStock(stock: any){
    this.currentStock = stock;
    this.editStockMode = true;
    this.initiliseProductStockFormData();
  }

  handleProductSubmit(){
    console.log('Product is Submit', this.productForm.value);
    const formValue = this.productForm.value;
    if(this.editMode){
      this.productService.editProduct(formValue).subscribe(response => {
        this.loadProductDetail();
      });
    } else{
      this.productService.createProduct(formValue).subscribe(response => {
        console.log('Getteing response',response);
        this.editProductId = response.product.id;
        this.loadProductDetail();
      });
    }
  }

  handleStockSubmit(){
    if (this.stockForm.valid) {
      const formValue =  this.stockForm.value;
      if (this.editStockMode){
        this.productService.editProductStock(formValue).subscribe(response => {
          console.log(response);
          this.loadProductDetail();
        });
      } else{
        this.productService.createProductStock(formValue).subscribe(response => {
          console.log(response);
          this.loadProductDetail();
        });
      }
    } else {
      console.log('Error in Product Stock Submit',this.stockForm.value);
    }
  }
}
