import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice } from '../invoice/invoice';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-invoicerpt',
  templateUrl: './invoicerpt.component.html',
  styleUrls: ['./invoicerpt.component.css']
})
export class InvoicerptComponent {

  displayedColumns = ['id','name',  'date',  'address',  'sgst',  'cgst'];
  exampleDatabase: InvoicerptDatabase | null;
  dataSource: invoiceDataSource | null;


  constructor(http: Http) {
    this.exampleDatabase = new InvoicerptDatabase(http);
    this.dataSource = new invoiceDataSource(this.exampleDatabase);
  }
}
export class InvoicerptDatabase  {
  private InvoiceUrl = 'http://localhost:3000/invoice';  // URL to web api
  
  private inv: Invoice[];
  constructor(private http:Http) {


   }
   getInvoice():Observable<Invoice[]>{
     return this.http.get(this.InvoiceUrl).map(this.extractInvoice);
     
   }
   extractInvoice(result:Response):Invoice[]{
     return result.json().map(i=> {
        return {
          id:i.id,
          name:i.name,
          number:i.number,
          address:i.address,
          cgst:i.cgst,
          sgst:i.sgst
        }
     });
   }


}
export class invoiceDataSource extends DataSource<Invoice>{
  constructor (private _invoice:InvoicerptDatabase){
    super();
  }
  connect():Observable<Invoice[]>{
      return this._invoice.getInvoice();
  }
  disconnect(){}
}


