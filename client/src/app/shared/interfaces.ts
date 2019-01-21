import { ModuleWithProviders } from '@angular/core';

export class Customer {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    state?: State;
    stateId?: number;
    zip: number;
    gender: string;
    // orderCount?: number;
    // orders?: IOrder[];
    // orderTotal?: number;
}

export class State {
    abbreviation: string;
    name: string;
}

export class Order {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

// export class IRouting {
//     routes: ModuleWithProviders,
//     components: any[]
// }

export class IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export class ICustomerResponse {
    status: boolean;
    customer: Customer;
}