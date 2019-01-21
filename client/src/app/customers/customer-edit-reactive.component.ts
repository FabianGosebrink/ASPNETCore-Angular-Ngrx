import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data-services/data.service';
import { Customer,State  } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'customer-edit-reactive',
  templateUrl: './customer-edit-reactive.component.html'
})
export class CustomerEditReactiveComponent implements OnInit {

  customerForm: FormGroup;
  customer: Customer = {
    firstname: '',
    lastname: '',
    gender: '',
    address: '',
    email: '',
    city: '',
    zip: 0
  };
  states: State[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    }

    this.getStates();
    this.buildForm();
  }

  getCustomer(id: string) {
      this.dataService.getCustomer(id)
        .subscribe((customer: Customer) => {
          this.customer = customer;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.customerForm = this.formBuilder.group({
        firstname:  [this.customer.firstname, Validators.required],
        lastname:   [this.customer.lastname, Validators.required],
        gender:     [this.customer.gender, Validators.required],
        email:      [this.customer.email, [Validators.required, ValidationService.emailValidator]],
        address:    [this.customer.address, Validators.required],
        city:       [this.customer.city, Validators.required],
        stateId:    [this.customer.stateId, Validators.required]
      });
  }

  getStates() {
    this.dataService.getStates().subscribe((states: State []) => this.states = states);
  }
  
  submit({ value, valid }: { value: Customer, valid: boolean }) {
      
      value.id = this.customer.id;
      value.zip = this.customer.zip || 0; 
      // var customer: Customer = {
      //   id: this.customer.id,
      // };

      if (value.id) {

        this.dataService.updateCustomer(value)
          .subscribe((customer: Customer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertCustomer(value)
          .subscribe((customer: Customer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to add customer';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/customers']);
          }
          else {
            this.errorMessage = 'Unable to delete customer';
          }
        },
        (err) => console.log(err));
  }

}