import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {FormControl} from '@angular/forms';
import {Product} from './product';
import {Receipt} from './receipt';
import {Products} from './receipt.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})

export class ReceiptComponent implements OnInit {

  lstproduct : Product[] = [];
  rec:Receipt = {} ;
  prod:Product;
  temp: Product;

  productList : string = '';

  productCtrl: FormControl;
  filteredProducts: any;

  filterProducts(val:string){
    return val ? this.lstproduct.filter (s =>s.name.toLowerCase().indexOf(val.toLowerCase())==0)
    :this.lstproduct;
  }

  constructor (private prodService: Products, public dialog:MdDialog){

    this.prodService.getProducts()
    .then ( prod => this.lstproduct = prod);
    this.productCtrl = new FormControl();
    this.filteredProducts = this.productCtrl.valueChanges
    .startWith(null).map (name => this.filterProducts(name));
    
    this.prodService.getReceipts().then( (e)=>{
      this.rec.receiptno = ("000000" +(e.length+1)).slice(-6);
    });

  
    this.rec.product = [];
    this.rec.address = "";
    this.rec.cust_name  = "";
    this.rec.discount = 0;
    this.rec.date = Date.now();
  }

  onProductSelect(prod, p){
    this.rec.product[prod.id - 1].sn = p.id;
    this.rec.product[prod.id - 1].purchase_prc = p.purchase_prc;
    this.rec.product[prod.id - 1].sell_prc = p.sell_prc;
    this.rec.product[prod.id - 1].cgst = p.cgst;
    this.rec.product[prod.id - 1].sgst = p.sgst;

  }

  
  getProductName():string{
    debugger;
    var pipe = new DatePipe('en-US');
    var date =  pipe.transform(this.rec.date , 'dd-MMM-yyyy');
    var total = 0;
    this.productList += 'Date ... ' + date.toString() + '\n';
    this.productList += 'Bill Number ... ' +  this.rec.receiptno + '\n';
    this.productList += '------------------------------- \n';
    
    this.rec.product.forEach((p) => {
      this.productList +=  p.unit + ' .... ' + p.name + ' .... '  +  (p.sell_prc * p.unit) + '\n'
    })

    this.rec.product.forEach((p) => {
      total +=  (p.sell_prc * p.unit)
    })

    this.productList += '\n Discount' +  ' .... ' + (total * this.rec.discount)/100 +  '\n'

    total = total - (total * this.rec.discount)/100;

    

    this.productList += '\n SGST & CGST' +  ' .... ' + ((total * this.rec.product[0].cgst)/100 + (total * this.rec.product[0].cgst)/100) +  '\n'

    this.productList += '------------------------------- \n';
    
    this.productList += 'Total' +  ' .... ' + ( total + ((total * this.rec.product[0].cgst)/100 + (total * this.rec.product[0].cgst)/100) ) +  '\n'
    

    return this.productList;
    
  }

  openDialog() {
    



    const docDefinition = { 
      
      content: [ 
        { text: 'Tyagi Hardware & Sanitery Store', style: 'firstLine'},
        { text: 'KH-530-531 Block D'},
        { text: 'Rajiv Nagar, Delhi' },
        { text: '-------------------------------' },
        { text: 'GST NO-07BCEPT4380HZC \n\n' },
        { text: this.rec.cust_name +  '\n' },
        { text: this.rec.address +  '\n\n' },
        { text: this.getProductName()  },        
        { text: '-------------------------------\n\n' },
        { text: '***computer generated receipt**', style:'songRow' },

    ],
    styles: {
      firstLine: {
        bold: true
      },
      secondLine: {
        fontSize: 15,
        bold: true,
        alignment: 'center'
      },
      songRow: {
        fontSize: 8,
        
        
      },
    },
    width :200

    };
    pdfMake.createPdf(docDefinition).print();

  }

  onBlurProduct(prod : Product, ctrl:FormControl){
    if (ctrl.value!=='')
    prod.name = ctrl.value; 
  }
   
  onAddProduct(event){
    
    this.prod = {
      "id":this.rec.product.length + 1,"sn":0, "name":"", "purchase_prc":0,"sell_prc":0,
      "unit":0,"sgst":0,"cgst":0}
    this.rec.product.push(this.prod);

  }
  ondeleteProduct (prod : Product)
  {
     const i:number = this.rec.product.findIndex(x => x.id == prod.id);
     this.rec.product.splice(i,1);

  }

  gettotalamount():number{
    var total =0 ;
    
    if (this.rec.product.length>0){
      for(var i=0;i<this.rec.product.length;i++){
        
         total += (this.rec.product[i].sell_prc * this.rec.product[i].unit) ;
      }
      return total -  ((total * this.rec.discount)/100);
  }
}
  get CGST():number {
    var amount = this.gettotalamount();
    if(amount > 0)
      return (amount * this.rec.product[0].cgst) / 100;
    else 
      return 0;
  }

  get SGST():number {
    var amount = this.gettotalamount();
    if(amount > 0)
      return (amount *  this.rec.product[0].sgst) / 100;
    else 
      return 0;
  }
  
  get TotalAmount() :number {
    return (this.gettotalamount()   +  this.CGST + this.SGST);
  }

  onunitchange(p,event){
    p.unit = event.target.value;
    p.amount = p.unit * p.sell_prc;
  }
  ngOnInit():void {
    this.prodService.getProducts()
    .then ( prod => this.lstproduct = prod);
  }

  saveandprint() {
    
    this.lstproduct.forEach((p)=>{
      this.rec.product.forEach((q)=>{
        if (p.id==q.sn){
          p.unit = p.unit- q.unit;
          this.prodService.update(p);
        }
      });
    });
    this.prodService.createreceipt(this.rec);
    alert ('Receipt created');
  }
}
@Component({
  selector: 'dialog-print-dialog',
  templateUrl: 'dialog-print-dialog.html',
})
export class DialogDataDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}