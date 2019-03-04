import { Injectable } from '@angular/core';
import { Game, GameData } from '../models/game';

@Injectable()
export class GameFactoryService {

    constructor() {

    }

    make(data: GameData) {
        return new Game(data);
    }

}
