import { Injectable } from '@angular/core';
import * as Bluebird from 'bluebird';
import { Game, GameData } from '../models/game';
import { GameFactoryService } from '../factories/game-factory.service';
import { PromisedHttpService } from './promised-http.service';
import { ApiResponse } from '../responses/api-response';
import { CreateGameResponse } from '../responses/create-game-response';

@Injectable()
export class GamesApiService {
    private static readonly GAMES_URL = 'api/games';


    constructor(private promisedHttpService: PromisedHttpService,
                private gameFactoryService: GameFactoryService) {

    }

    getGames(): Bluebird<Array<Game>> {
        return this.promisedHttpService.get(GamesApiService.GAMES_URL, {responseType: 'json'})
            .then((gamesData: Array<GameData>) => {
                return gamesData.map(gameData => this.gameFactoryService.make(gameData));
            });
    }

    joinGame(game: Game): Bluebird<void> {

        const gameName = game.getName();

        return this.promisedHttpService.post(`${GamesApiService.GAMES_URL}/join`, {
            gameName
        }, {
            responseType: 'json'
        });
    }

    quitGame(): Bluebird<void> {
        return this.promisedHttpService.post(`${GamesApiService.GAMES_URL}/quit`, null, {
            responseType: 'json'
        });
    }


    createGameWithName(gameName: string): Bluebird<Game> {
        return this.promisedHttpService.put(`${GamesApiService.GAMES_URL}/create`, {
            gameName
        }, {
            responseType: 'json'
        }).then((response: CreateGameResponse) => {
            return this.gameFactoryService.make({
                name: gameName
            });
        });
    }

    playAtSlotWithIdForGame(slotId: number, game: Game) {
        const gameName = game.getName();

        return this.promisedHttpService.post(`${GamesApiService.GAMES_URL}/play`, {
            gameName,
            slotId
        }, {
            responseType: 'json'
        });
    }

}
