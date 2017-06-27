var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AccountRoutes } from './account.routes';
import { LoginComponent } from './components/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
var AccountModule = (function () {
    function AccountModule() {
    }
    return AccountModule;
}());
AccountModule = __decorate([
    NgModule({
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
        providers: [],
        exports: []
    })
], AccountModule);
export { AccountModule };
//# sourceMappingURL=account.module.js.map