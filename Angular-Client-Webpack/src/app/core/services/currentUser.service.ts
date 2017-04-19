import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class CurrentUserService {

    constructor(private storageService: StorageService) { }

    get token(): string {
        let token = this.storageService.getItem('auth');
        return token;
    }

    set token(token: string) {
        this.storageService.setItem('auth', token);
    }

    get username() {
        let username = this.storageService.getItem('username');
        return username;
    }

    set username(username: string) {
        if (!username) {
            this.storageService.removeItem('username');
        }
        this.storageService.setItem('username', username);
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }
}
