import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountRoutes } from './account.routes';
import { LoginComponent } from './container/login/login.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(AccountRoutes)],

  declarations: [LoginComponent],

  exports: [],
})
export class AccountModule {}
