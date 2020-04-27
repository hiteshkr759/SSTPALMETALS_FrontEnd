import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

export interface PaginationConfig { 
  totalRecordCount: number;
  currentPage?: number;
  noOfRecordPerPage?: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {


  @Input() paginationConfig: PaginationConfig;

  @Input() test: string;

  @Output() pageChange = new EventEmitter();

  showPagination = false;

  defaultConfig: PaginationConfig  =  {
    totalRecordCount : 21,
    currentPage : 1,
    noOfRecordPerPage : 5
  }

  isFirstPage =  false;
  isLastPage = false;

  totalPage: number[];

  constructor() { }

  ngOnInit() {
   this.initPageConfig();
  }


  // ngOnChanges(changes: SimpleChange) : void{
  //   if(!changes.firstChange){
  //     this.initPageConfig();
  //   }
  // }

  ngOnChanges(){
    
  }

  initPageConfig(){
    this.paginationConfig = { 
      ...this.defaultConfig, 
      ...this.paginationConfig
    }
    const totalPage = Math.ceil(this.paginationConfig.totalRecordCount / this.paginationConfig.noOfRecordPerPage);
    if (totalPage > 1){
      this.showPagination = true;
    } else {
      this.showPagination = false;
    }
    this.totalPage = Array(totalPage).fill(0).map((x, i ) => i+1);
    this.disableLinks(this.paginationConfig.currentPage);
  }


  onNext(){
    this.onPage(this.paginationConfig.currentPage + 1);
  }

  onPrev(){
    this.onPage(this.paginationConfig.currentPage - 1);
  }

  disableLinks(currentPage: number){
    this.isFirstPage = currentPage === 1 ? true : false;
    this.isLastPage = currentPage === this.totalPage.length ? true : false;
    this.paginationConfig.currentPage = currentPage;
  }

  onPage(currentPage: number){
    this.disableLinks(currentPage);
    this.pageChange.emit(currentPage);
  }

  onFirst(){
    this.onPage(1);
  }

  onLast(){
    this.onPage(this.totalPage.length);
  }

}
