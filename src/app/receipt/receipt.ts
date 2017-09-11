import {Product} from './product'
export class Receipt{
    id ?:string;
    receiptno ?:string;
    date ?:number;
    cust_name ?: string;
    address ?: string;
    product ?: Array<Product> = [];
    discount ?:number;
    sgst ?:number;
    cgst ?:number;

}