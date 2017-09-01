import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AccountRoutes } from './account.routes';
import { LoginComponent } from './components/login/login.component';
import { AccountEffects } from './store/effects/account.effects';
import { accountReducer } from './store/reducers/accounts.reducer';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        RouterModule.forChild(AccountRoutes),
        StoreModule.forFeature('account', {
            accountStore: accountReducer
        }),
        EffectsModule.forFeature([AccountEffects])
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
