import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Products} from '../receipt/receipt.service';
import {Receipt} from '../receipt/receipt'
@Component({
  selector: 'app-receiptrpt',
  templateUrl: './receiptrpt.component.html',
  styleUrls: ['./receiptrpt.component.css']
})
export class ReceiptrptComponent implements OnInit {

  
  receipts : Receipt[];
  constructor(private http:Http, private receiptsrv:Products) {
  receiptsrv.getReceipts().then(r=> r = this.receipts);

    

   }

  ngOnInit() {
  }

}
