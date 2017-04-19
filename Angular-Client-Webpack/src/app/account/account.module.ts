import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login.component';
import { AccountRoutes } from './account.routes';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        RouterModule.forChild(AccountRoutes)
    ],

    declarations: [
        // Components & Directives
LoginComponent
    ],

    providers: [
        // Services
    ],

    exports: [

    ]
})

export class AccountModule { }