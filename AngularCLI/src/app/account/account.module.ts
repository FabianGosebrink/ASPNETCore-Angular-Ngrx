import { AccountRoutes } from './account.routes';
import { LoginComponent } from './components/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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