import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { Configuration } from './configuration/app.configuration';
import { AuthGuard } from './guards/authentication.guard';
import { PaginationComponent } from './pagination/pagination.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // Modules
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ NavigationComponent, CapitalizePipe, TrimPipe, FilterTextboxComponent, PaginationComponent ],

  providers: [
    // Services
    Configuration,
    AuthGuard
  ],

  exports: [ NavigationComponent, CommonModule,  CapitalizePipe, TrimPipe, FilterTextboxComponent, PaginationComponent ]
})
export class SharedModule {}
