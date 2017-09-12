import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Products} from '../receipt/receipt.service';
import {Receipt} from '../receipt/receipt';
import { DataSource } from '@angular/cdk'; 
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-receiptrpt',
  templateUrl: './receiptrpt.component.html',
  styleUrls: ['./receiptrpt.component.css']
})
export class ReceiptrptComponent implements OnInit {
  displayedColumns = ['id','name',  'number',  'address',  'date',  'discount', 'actions'];

  invoiceDatabase: InvoicerptDatabase | null;
  dataSource: invoiceDataSource | null;
  
  
  receipts : Receipt[];
  constructor(private http:Http, private receiptsrv:Products) {
    this.invoiceDatabase = new InvoicerptDatabase(http);
    this.dataSource = new invoiceDataSource(this.invoiceDatabase);
   }

    ngOnInit() {}
  }

export class InvoicerptDatabase  {
    private ReceiptUrl = 'http://localhost:3000/receipt';  // URL to web api
    
    private inv: Receipt[];
    constructor(private http:Http) {
  
     
     }
     
     getReceipt():Observable<Receipt[]>{
       return this.http.get(this.ReceiptUrl).map(this.extractReceipt);
       
     }
     
     extractReceipt(result:Response):Receipt[]{
       
       return result.json().map (i=> {
          return {
            id:i.id,
            name:i.receipt.cust_name,
            number:i.receipt.receiptno,
            address:i.receipt.address,
            date:i.receipt.date,
            discount:i.receipt.discount
          }
       });
     }
  
  
  }
  export class invoiceDataSource extends DataSource<Receipt>{
    constructor (private _invoice:InvoicerptDatabase){
      super();
    }
    connect():Observable<Receipt[]>{
        return this._invoice.getReceipt();
    }
    disconnect(){}
  }
  

