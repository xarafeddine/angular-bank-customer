import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  
  {
    path: 'customers/details/:id',
    component: CustomerDetailsComponent,
  },
  {
    path: 'customers',
    component: CustomersListComponent,
  },
  {
    path: 'create',
    component: CreateCustomerComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
