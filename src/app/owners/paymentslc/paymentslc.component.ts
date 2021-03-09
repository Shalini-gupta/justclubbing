import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;

export interface Transaction {
  qty: number;
  starttime: string;
  endtime:string;
  totalhours: number;
}


 
@Component({
  selector: 'app-paymentslc',
  templateUrl: './paymentslc.component.html',
  styleUrls: ['./paymentslc.component.css']
})
export class PaymentslcComponent implements OnInit {
  displayedColumns: string[] = ['qty', 'starttime', 'endtime', 'totalhours'];
  transactions: Transaction[] = [
    {qty: 2, starttime:'5:00 PM', endtime:'9:00 PM', totalhours: 20},
    {qty: 3, starttime:'10:00 AM', endtime:'2:00 PM', totalhours: 12},
    {qty: 32, starttime:'5:00 AM', endtime:'9:00 PM', totalhours: 32},
    
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.totalhours).reduce((acc, value) => acc + value, 0);
  }

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

 

}
