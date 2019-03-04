import { Injectable } from '@angular/core';
import Noel from 'noel';
import { NoelEvent } from 'noel/dist/types/event';
import { User } from '../models/user';
import { AuthApiService } from './auth-api.service';
import { ApiResponse } from '../responses/api-response';
import * as Bluebird from 'bluebird';
import { IsLoggedInParsedResponse } from '../responses/is-logged-in-parsed-response';

@Injectable()
export class AuthService {

    private userChangedEvent: NoelEvent;
    private loggedInUser: User;

    constructor(private authApiService: AuthApiService) {
        const em = new Noel();
        this.userChangedEvent = em.getEvent('userChanged');
    }

    onUserChanged(listener: OnUserChangedEventListener) {
        return this.userChangedEvent.on(listener);
    }

    logIn(userName: string): Bluebird<User> {
        return this.authApiService.logIn({
            userName: userName
        }).then((loggedInUser: User) => {
            this.setLoggedInUser(loggedInUser);
            return loggedInUser;
        });
    }

    logOut(): Bluebird<ApiResponse> {
        return this.authApiService.logOut().then((response) => {
            this.userChangedEvent.emit(undefined);
            return response;
        });
    }

    getLoggedInUser(): User {
        return this.loggedInUser;
    }

    isLoggedIn(): Bluebird<boolean> {
        if (typeof this.loggedInUser !== 'undefined') return Bluebird.resolve(true);
        return this.authApiService.isLoggedIn().then((response: IsLoggedInParsedResponse) => {
            if (response.loggedIn) {
                this.setLoggedInUser(response.loggedInUser);
            }
            return response.loggedIn;
        })
    }

    private setLoggedInUser(user: User) {
        this.loggedInUser = user;
        this.userChangedEvent.emit(user);
    }
}

export type OnUserChangedEventListener = (newUser: User) => void;
