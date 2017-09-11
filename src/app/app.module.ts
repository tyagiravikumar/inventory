import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MdSidenavModule,MdButtonModule, MdInputModule,
          MdListModule, MdIconModule, 
          MdCheckboxModule,MdToolbarModule,
          MdTableModule, MdPaginatorModule, MdAutocompleteModule ,MdDialogModule ,
           MdDatepickerModule,MdNativeDateModule } from '@angular/material';
import { RouterModule, Routes }   from '@angular/router';
import { ProductsComponent} from './products/products.component';

import { CdkTableModule } from '@angular/cdk';
import { ReceiptComponent, DialogDataDialog } from './receipt/receipt.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Product} from './receipt/product';

import {Products} from './receipt/receipt.service';
import {InvoiceService} from './invoice/invoice.service';

import { InvoiceComponent } from './invoice/invoice.component';
import { ReceiptrptComponent } from './receiptrpt/receiptrpt.component';
import { InvoicerptComponent } from './invoicerpt/invoicerpt.component';
import { PdfmakeModule } from 'ng-pdf-make';

const appRoutes: Routes = [
  {path:'products', component:ProductsComponent}
 , {path :'', redirectTo: '/products', pathMatch:'full'}
 ,{path : 'receipt', component:ReceiptComponent}
 ,{path : 'invoice', component:InvoiceComponent}
 ,{path : 'invoicerpt', component:InvoicerptComponent}
 ,{path : 'receiptrpt', component:ReceiptrptComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ReceiptComponent,
    InvoiceComponent,
    ReceiptrptComponent,
    InvoicerptComponent,
    DialogDataDialog
    ],
  imports: [
    BrowserModule,
    HttpModule,
    MdDialogModule,
    MdButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    NoopAnimationsModule,
    MdSidenavModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdListModule,
    MdTableModule,
    MdPaginatorModule,
    CdkTableModule,
    MdAutocompleteModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Products, InvoiceService],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataDialog]
})
export class AppModule { }
