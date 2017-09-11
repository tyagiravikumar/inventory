import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';


import { ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})



export class ProductsComponent  {

  displayedColumns = ['id','name', 'unit',  'price','tax'];

  productdatabase : ProductDatabase | null;
  productdatasource : ProductDataSource | null;


  selectedOption: string;




  constructor(private http:Http) {
  
    this.productdatabase = new ProductDatabase(http);
    this.productdatasource = new ProductDataSource(this.productdatabase);    
   }
}
export interface ProductData {
  id:string;
  name:string;
  unit:number;
  price:number;
  tax:number;
}

export class ProductDatabase {
  private serviceURL = 'http://localhost:3000/product';
  constructor (private http:Http){}
  getProduct() : Observable<ProductData[]>{
        return this.http.get(this.serviceURL)
    .map(this.extractData)
  }

  extractData (result:Response): ProductData[] {
    
    return result.json().map (product => {
      return {
        id: product.id,
        name : product.name,
        unit : product.unit,
        price : product.sell_prc,
        tax : product.cgst
       
      }
    });
  }
}


export class ProductDataSource extends DataSource<ProductData>{
  constructor (private _productDatabase: ProductDatabase){
    super();
  }
  connect(): Observable <ProductData[]>{
    
    return this._productDatabase.getProduct();
  }
  
  disconnect(){}
}
