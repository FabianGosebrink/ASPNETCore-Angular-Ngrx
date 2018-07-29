import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { Configuration } from './configuration/app.configuration';
import { AuthGuard } from './guards/authentication.guard';

@NgModule({
  imports: [
    // Modules
    CommonModule,
    RouterModule
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

  exports: [NavigationComponent]
})
export class SharedModule {}
