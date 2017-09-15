import {Product} from '../receipt/product'
export class Invoice{
    id ?:string;
    name ?: string;
    number?:string;
    address ?: string;
    product ?: Array<Product> = [];
    discount ?:number;
    
    date ?:number;
    
    get cgst():number {
        if(this.product.length>0) return this.product[0].cgst;
        else return 0;
    }
    get sgst():number {
        if(this.product.length>0) return this.product[0].sgst;
        else return 0;
    }
    get Total():number{
          return 0;  
    }


}