import { User } from '../models/user';

export interface IsLoggedInParsedResponse {
    loggedIn: boolean;
    loggedInUser?: User;
}
