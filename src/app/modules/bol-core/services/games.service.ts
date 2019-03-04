import { Injectable } from '@angular/core';
import { GamesApiService } from './games-api.service';
import * as Bluebird from 'bluebird';
import { Game } from '../models/game';

@Injectable()
export class GamesService {


    constructor(private gamesApiService: GamesApiService) {
    }

    getGames(): Bluebird<Array<Game>> {
        return this.gamesApiService.getGames();
    }

    createGameWithName(gameName: string): Bluebird<Game> {
        return this.gamesApiService.createGameWithName(gameName);
    }
}
