import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../models/customet';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
})
export class CustomerCardComponent {
  @Input() customer?: Customer;
  @Input() isDeleteLoading = false;

  @Output() delete = new EventEmitter<Customer>();

  onDelete() {
    this.delete.emit(this.customer);
  }
}
