import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';

export const AccountRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];
