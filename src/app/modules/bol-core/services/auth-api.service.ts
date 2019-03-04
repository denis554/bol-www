import { Injectable } from '@angular/core';
import { User, UserData } from '../models/user';
import { UserFactoryService } from '../factories/user-factory.service';
import 'rxjs/add/operator/toPromise';
import { ApiResponse } from '../responses/api-response';
import * as Bluebird from 'bluebird';
import { PromisedHttpService } from './promised-http.service';
import { IsLoggedInResponse } from '../responses/is-logged-in-response';
import { IsLoggedInParsedResponse } from '../responses/is-logged-in-parsed-response';
import { LogInResponse } from '../responses/log-in-response';

@Injectable()
export class AuthApiService {
    private static readonly LOGIN_URL = 'api/users/login';
    private static readonly LOGOUT_URL = 'api/users/logout';
    private static readonly IS_LOGGED_IN_URL = 'api/users/isLoggedIn';

    constructor(private promisedHttpService: PromisedHttpService,
                private userFactoryService: UserFactoryService) {

    }

    logIn(data: LoginData): Bluebird<User> {
        return this.promisedHttpService.post(AuthApiService.LOGIN_URL, data, {
            responseType: 'json'
        }).then((response: LogInResponse) => {
            return this.userFactoryService.make({
                name: response.userName
            });
        });
    }

    logOut(): Bluebird<ApiResponse> {
        return this.promisedHttpService.post(AuthApiService.LOGOUT_URL, undefined, {
            responseType: 'json'
        }) as Bluebird<ApiResponse>;
    }

    isLoggedIn(): Bluebird<IsLoggedInParsedResponse> {
        return this.promisedHttpService.post(AuthApiService.IS_LOGGED_IN_URL, undefined, {
            responseType: 'json'
        }).then((response: IsLoggedInResponse) => {
            const loggedIn = response.loggedIn;
            if (response.loggedIn) {
                const loggedInUser = this.userFactoryService.make({
                    name: response.userName
                });
                return {
                    loggedInUser,
                    loggedIn
                };
            }
            return response;
        }) as Bluebird<IsLoggedInParsedResponse>;
    }
}

export interface LoginData {
    userName: string;
}
