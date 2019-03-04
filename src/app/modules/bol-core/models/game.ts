/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */
import { BaseModel } from './base-model';

export class Game extends BaseModel<GameData> {
    constructor(data: GameData) {
        super(data);
    }

    getName(): string {
        return this.getDataKeyValue('name');
    }

    isFull() {
        return this.getDataKeyValue('full');
    }
}

export interface GameData {
    name: string;
}
