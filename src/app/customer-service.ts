import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerFormData } from './models/customet';

const API_URL = 'http://localhost:3000/customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${customer.id}`, customer);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(`${API_URL}/${customer.id}`);
  }

  search(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${query}`);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }

  createCustomer(customerFormData: CustomerFormData): Observable<Customer> {
    return this.http.post<Customer>(API_URL, customerFormData);
  }

  getCustomerByEmail(email: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?email=${email}`);
  }
}
