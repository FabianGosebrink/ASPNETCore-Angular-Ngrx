import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMealFooterComponent } from './components/footer/eMeal-footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { Configuration } from './configuration/app.configuration';
import { AuthGuard } from './guards/authentication.guard';

@NgModule({
  imports: [
    // Modules
    CommonModule,
    RouterModule,
  ],

  declarations: [
    // Components & directives
    NavigationComponent,
    EMealFooterComponent,
  ],

  providers: [
    // Services
    Configuration,
    AuthGuard,
  ],

  exports: [NavigationComponent, EMealFooterComponent],
})
export class SharedModule {}
