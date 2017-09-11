import { Injectable } from '@angular/core';
import {Product} from './product';
import {Receipt} from './receipt';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class Products {
    private headers = new Headers({'Content-Type': 'application/json'});
    private productsUrl = 'http://localhost:3000/product';  // URL to web api
    private receiptUrl = 'http://localhost:3000/receipt';  // URL to web api

    constructor (private http:Http){
        
    }

    getProducts() : Promise<Product[]>{
   
      return this.http.get(this.productsUrl)
        .toPromise()
        .then(Response => Response.json() as Product[])
        .catch(this.handleError)
    }

    getReceipts():Promise<Receipt[]>{
     return this.http.get(this.receiptUrl)
      .toPromise()
      .then(response => response.json() as Receipt[])
      .catch(this.handleError);
    }

    getProduct(id:number):Promise<Product>{
        const url = `${this.productsUrl}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Product)
        .catch(this.handleError);
    } 

    delete(id: number): Promise<void> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }  
    create(receipt: Product): void {
         this.http
          .post(this.productsUrl, JSON.stringify(receipt), {headers: this.headers})
          .toPromise()
          .then(res => res.json() as any)
          .catch(this.handleError); 
      }
    
      createreceipt(receipt: Receipt): void {
        this.http
          .post(this.receiptUrl, JSON.stringify({receipt}), {headers: this.headers})
          .toPromise()
          .then(res => res.json() as Product)
          .catch(this.handleError);
      }

      update(prod: Product): Promise<Product> {
        const url = `${this.productsUrl}/${prod.id}`;
        return this.http
          .put(url, JSON.stringify(prod), {headers: this.headers})
          .toPromise()
          .then(() => prod)
          .catch(this.handleError);
      }
    

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}