import {Product} from '../receipt/product'
export class Invoice{
    id ?:string;
    name ?: string;
    number?:string;
    address ?: string;
    product ?: Array<Product> = [];
    discount ?:number;
    sgst ?:number;
    cgst ?:number;  

}