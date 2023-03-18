import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CustomerService } from '../customer-service';
import { Customer } from '../models/customet';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  @Input() customer?: Customer;
  @Input() action: string = 'Create';

  customerForm!: FormGroup;
  isLoading = false;

  ngOnInit() {
    console.log('edit', this.customer);
    const fields = {
      firstName: [
        this.customer?.firstName || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        this.customer?.lastName || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        this.customer?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [
        this.customer?.phone || '',
        [
          Validators.required,
          Validators.pattern(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
          ),
        ],
      ],
      address: [
        this.customer?.address || '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      gender: [this.customer?.gender || 'male', [Validators.required]],
      accountType: [
        this.customer?.accountType || 'checking',
        [Validators.required],
      ],

      extraDetails: [this.customer?.extraDetails || ''],
    };

    this.action === 'Create' &&
      fields.email.push([this.validateEmail.bind(this)]);

    this.customerForm = this.formBuilder.group(fields);
  }
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  submit() {
    this.isLoading = true;
    this.customerService
      .createCustomer(this.customerForm.value)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
        this.router.navigate(['/customers/details', customer.id]);
      });
  }

  update() {
    this.isLoading = true;

    this.customerService
      .updateCustomer({ ...this.customer, ...this.customerForm.value })
      .subscribe((updatedCustomer: Customer) => {
        console.log(updatedCustomer)
        this.isLoading = false;
        this.customerForm.reset();
        window.location.reload();
        this.router.navigate(['/customers/details', updatedCustomer.id]);
      });
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

  validateEmail(
    control: AbstractControl
  ): Observable<{ emailExists: boolean } | null> {
    return this.customerService.getCustomerByEmail(control.value).pipe(
      map((customers: Customer[]) => {
        if (customers.length > 0) {
          return { emailExists: true };
        }
        return null;
      })
    );
  }
}
