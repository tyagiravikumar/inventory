import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Product} from '../receipt/product';
import {Invoice} from './invoice';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import {Products} from '../receipt/receipt.service'

@Injectable()
export class InvoiceService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private productsUrl = 'http://localhost:3000/product';  // URL to web api
    private InvoiceUrl = 'http://localhost:3000/invoice';  // URL to web api
    a:Product[] ;

    constructor(private http : Http, private prod : Products){

    }


    createInvoice(invoice:Invoice):void{
        this.prod.getProducts().then(
            (p)=>{
                invoice.product.forEach((e)=>{
                    p.forEach((n)=>{
                        if (n.id == e.sn){
                            n.unit = Number(n.unit) + Number(e.unit);
                            n.purchase_prc = e.purchase_prc;
                            n.sell_prc = e.sell_prc;
                            n.sgst = e.sgst;
                            n.cgst= e.cgst;
                            this.prod.update(n).catch(this.handleError);
                        }
                    });
                });
                invoice.product.forEach((e)=>{
                    this.prod.getProducts().then((p)=>{
                        if (e.sn==0) {
                            e.id = p.length +1;
                            this.prod.create(e);
                        }
                    })

                });
                
                this.http
                .post(this.InvoiceUrl, JSON.stringify({invoice}), {headers : this.headers})
                .toPromise()                
                .then(res => res.json() as any)
                .catch(this.handleError);
        
                alert ('Product Added!!');
            }
        )
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}