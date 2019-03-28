import { Component, OnInit } from '@angular/core';
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data-services/data.service';
//import { CustomerDataService } from '../core/data-services/customer-data.service';
import { ICustomer} from '../shared/interfaces';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-customers', 
  templateUrl: './customers.component.html'
})
export class CustomerComponent implements OnInit {

  title: string;
  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, private dataService: DataService, private dataFilter: DataFilterService )
  {
  }
  ngOnInit() {
    this.title = 'Customers';
    this.getCustomers();
  }

  filterChanged(filterText: string) {
    if (filterText && this.customers) {
        let props = ['firstName', 'lastName', 'address', 'city', 'state.name', 'orderTotal'];
        this.filteredCustomers = this.dataFilter.filter(this.customers, props, filterText);
    }
    else {
      this.filteredCustomers = this.customers;
    }
  }

  pageChanged(page: number) {
   // this.getCustomersPage(page);
  }

  getCustomers() {
    this.dataService.getCustomers()
         .subscribe((response: ICustomer[]) => {
          this.customers = response;
        },
        (err: any) => console.log(err),
        () => console.log('getCustomersPage() retrieved customers'));
  }
  // updateCustomer(customer : Customer)
  // {
  //   this.dataService.updateCustomer(customer)
  //    .subscribe((response: any) => {

  //    },
  //    (err: any) => console.log(err),
  //    () => console.log('update customer'));
  // }
  // deleteCustomer(id : string)
  // {
  //   this.dataService.deleteCustomer(id)
  //   .subscribe((response: any) => {
  //   },
  //   (err: any) => console.log(err),
  //   () => console.log('delete customer'));
  // }
  getCustomer(id : string)
  {
    this.dataService.getCustomer(id)
    .subscribe((response: ICustomer) => {
    },
    (err: any) => console.log(err),
    () => console.log('get customer'));
  }
}
