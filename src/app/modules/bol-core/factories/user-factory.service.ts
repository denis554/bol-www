import { Injectable } from '@angular/core';
import { User, UserData } from '../models/user';

@Injectable()
export class UserFactoryService {

    constructor() {
    }

    make(data: UserData): User {
        return new User(data);
    }

}

