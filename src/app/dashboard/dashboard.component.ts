import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-service';
import { Customer } from '../models/customet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalNumber: number = 0;
  totalAmount: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.totalNumber = customers.length;
      this.totalAmount = +(customers.reduce((prev, curr) => {
        return prev + (curr.amount || 0);
      }, 0)).toFixed(2);
    });
  }
}
