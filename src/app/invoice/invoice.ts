import {Product} from '../receipt/product'
export class Invoice{
    id ?:string;
    name ?: string;
    number?:string;
    address ?: string;
    product ?: Array<Product> = [];
    discount ?:number;
    cgst?:number;
    sgst?:number;
    date ?:number;

}