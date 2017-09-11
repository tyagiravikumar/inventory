import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Invoice } from './invoice';
import { Product } from '../receipt/product'
import {Products} from '../receipt/receipt.service';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

    inv :Invoice = {};
    lstproduct : Product[] = [];
    prod:Product;
    temp: Product;
    iProductNo : number = 0;
    productCtrl: FormControl;
    filteredProducts: any;
  
    filterProducts(val:string){
      return val ? this.lstproduct.filter (s =>s.name.toLowerCase().indexOf(val.toLowerCase())==0)
      :this.lstproduct;
    
    }
  
  constructor(private prodService: Products, private invService : InvoiceService) {

    this.prodService.getProducts()
          .then ( prod => this.lstproduct = prod);

    this.productCtrl = new FormControl();
    this.filteredProducts = this.productCtrl.valueChanges
          .startWith(null).map (name => this.filterProducts(name));

    this.inv.product = [];
    this.inv.address = "";
    this.inv.name  = "";
    this.inv.discount = 0;
    
   }
   onBlurProduct(prod : Product, ctrl:FormControl){
     if (ctrl.value!=='')
     prod.name = ctrl.value; 
   }
   onProductSelect(prod, p){
    this.inv.product[prod.id - 1].sn = p.id;
    this.inv.product[prod.id - 1].purchase_prc = p.purchase_prc;
    this.inv.product[prod.id - 1].sell_prc = p.sell_prc;
    this.inv.product[prod.id - 1].cgst = p.cgst;
    this.inv.product[prod.id - 1].sgst = p.sgst;
  }

  onAddProduct(event){
    this.prod = {
      "id":this.inv.product.length+1, "sn":0, "name":"", "purchase_prc":0,"sell_prc":0,
      "unit":0,"sgst":0,"cgst":0};
        
      this.inv.product.push(this.prod);

  }
  ondeleteProduct (prod : Product) {
     const i:number = this.inv.product.findIndex(x => x.id == prod.id);
     this.inv.product.splice(i,1);
  }

  gettotalamount():number{

    
    var total =0 ;
    if (this.inv.product.length>0){
      for(var i=0;i<this.inv.product.length;i++){
         total += (this.inv.product[i].purchase_prc * this.inv.product[i].unit) ;
      }
      return total -  ((total * this.inv.discount)/100);
  }
}

saveandprint():any{
  this.invService.createInvoice(this.inv);
  
}

  onunitchange(p,event){
    p.unit = event.target.value;
    p.amount = p.unit * p.purchase_prc;
  }
  ngOnInit() {
    this.prodService.getProducts()
    .then ( prod => this.lstproduct = prod);
  }

}
