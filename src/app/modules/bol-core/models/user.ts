/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */
import { BaseModel } from './base-model';

export class User extends BaseModel<UserData> {

    private name: string;

    constructor(data: UserData) {
        super(data);
    }

    getName(): string {
        return this.getDataKeyValue('name');
    }
}

export interface UserData {
    name: string;
}
