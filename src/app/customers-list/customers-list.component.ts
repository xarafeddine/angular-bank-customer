import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Customer } from '../models/customet';
import { CustomerService } from '../customer-service';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  isDeleteLoading: any[] = [];
  searchQuery = '';
  searchQuerySubject = new Subject<string>();

  constructor(private customerService: CustomerService) {
    this.searchQuerySubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.search(query);
      });
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.isDeleteLoading = customers.map((p) => ({
        id: p.id,
        isLoading: false,
      }));
    });
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
  }

  delete(customer: Customer) {
    this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customers = this.customers.filter((p) => p.id !== customer.id);
      this.setIsLoading(customer, false);
    });
  }

  getIsDeleteLoading(customer: Customer) {
    return this.isDeleteLoading.find((p) => p.id === customer.id)?.isLoading;
  }

  search(query: string) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers;
    });
  }

  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
  }

  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading.map((p) => {
      if (p.id === customer.id) {
        return { ...p, isLoading };
      }
      return p;
    });
  }
}
