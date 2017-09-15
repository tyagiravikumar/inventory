import { Component, OnInit } from '@angular/core';
import { Http, Response ,RequestOptions} from '@angular/http';
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
  private InvoiceUrl = 'http://localhost:3000/invoice';  // URL to web api
  invoiceDatabase: InvoicerptDatabase | null;
  displayedColumns = ['id','name',  'date',  'number', 'amount', 'sgst',  'cgst', 'total', 'actions'];
  dataSource: invoiceDataSource | null;


  constructor(private http: Http) {
    this.invoiceDatabase = new InvoicerptDatabase(http);
    this.dataSource = new invoiceDataSource(this.invoiceDatabase);
  }

  delete(row:any){
    debugger;
    this.http.delete(this.InvoiceUrl+'/' + row.id )
    .toPromise()
    .then();

    alert('Record Deleted');
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
        
        var vamount = 0;
        
        i.invoice.product.forEach(element => {
          vamount += (element.amount!=undefined)? element.amount : 0;
        });

        return {
          id:   i.id,
          name: i.invoice.name,
          date: '',
          number: i.invoice.number,
          amount : vamount ,
          sgst:  (i.invoice.product.length>0)?(i.invoice.product[0].sgst):0,
          cgst: (i.invoice.product.length>0)?(i.invoice.product[0].cgst):0,
          total: vamount + (vamount * ((i.invoice.product.length>0)?(i.invoice.product[0].sgst):0)/100)
                + (vamount * ((i.invoice.product.length>0)?(i.invoice.product[0].cgst):0)/100)

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


