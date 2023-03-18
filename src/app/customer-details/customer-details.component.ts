import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CustomerService } from '../customer-service';
import { Customer } from '../models/customet';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customer?: Customer;
  edite = false;
  constructor(
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('the value of edite',this.edite)
    this.activeRoute.params
      .pipe(switchMap((params) => this.customerService.getById(params['id'])))
      .subscribe({
        next: (customer) => {
          console.log(customer);
          this.customer = customer;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }
}
