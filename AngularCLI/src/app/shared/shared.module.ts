import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { NavigationComponent } from './components/navigation/navigation.component';
import { Configuration } from './configuration/app.configuration';
import { AuthGuard } from './guards/authentication.guard';
import { SharedEffects } from './stores/effects/shared.effects';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        RouterModule,
        EffectsModule.forFeature([SharedEffects])
    ],

    declarations: [
        // Components & directives
        NavigationComponent
    ],

    providers: [
        // Services
        Configuration,
        AuthGuard
    ],

    exports: [
        NavigationComponent
    ]
})

export class SharedModule { }

