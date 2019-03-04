import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../modules/bol-core/models/game';
import * as Bluebird from 'bluebird';
import { GamesService } from '../../modules/bol-core/services/games.service';
import { BolCoreEventsService } from '../../modules/bol-core/services/bol-core-events.service';
import { LoggerFactoryService, Logolous } from '../../modules/bol-core/services/logger-factory.service';
import { GameService } from '../../modules/bol-core/services/game.service';

@Component({
    selector: 'bol-games-route',
    templateUrl: './games-route.component.html',
    styleUrls: ['./games-route.component.scss']
})
export class GamesRouteComponent implements OnInit, OnDestroy {
    private static readonly REFRESH_GAMES_INTERVAL = 5000;
    private static readonly ESCAPE_KEYCODE = 27;


    gamesFilter: string;
    games: Array<Game>;

    gamesRefreshInProgress: boolean;

    createGameViewVisible: boolean;
    createGameInProgress: boolean;
    createGameErrorMessage: string;
    gameToCreateName: string;

    private logger: Logolous;
    private intervalHandle;

    constructor(private loggerFactoryService: LoggerFactoryService,
                private bolCoreEventsService: BolCoreEventsService,
                private gamesService: GamesService,
                private gameService: GameService) {
        this.logger = loggerFactoryService.make('GamesRouteComponent');
    }

    ngOnInit() {
        this.refreshGames().then(() => {
            this.intervalHandle = setInterval(() => {
                this.refreshGames();
            }, GamesRouteComponent.REFRESH_GAMES_INTERVAL);
        })
    }

    ngOnDestroy() {
        if (this.intervalHandle) clearInterval(this.intervalHandle);
    }

    refreshGames(): Bluebird<void> {
        if (this.gamesRefreshInProgress) return;
        this.gamesRefreshInProgress = true;
        return this.getGames().then((games) => {
            this.games = games;
        }).finally(() => {
            this.gamesRefreshInProgress = false;
        });
    }

    trackByGame(index, game: Game): string {
        return `${game.getName()}${game.isFull()}`
    }

    showCreateGameView() {
        this.createGameViewVisible = true;
    }

    hideCreateGameView() {
        this.createGameViewVisible = false;
    }

    createGame() {
        this.createGameInProgress = true;
        const gameName = this.gameToCreateName;
        return this.gamesService.createGameWithName(gameName).then((game) => {
            this.gameService.setGame(game);
            this.bolCoreEventsService.emitUserCreatedGame(game);
        }).catch((err) => {
            this.logger.error(`Could not create game with name "${gameName}" with error:`, err);
            this.createGameErrorMessage = err.error.message;
        }).finally(() => {
            this.createGameInProgress = false;
        });
    }

    @HostListener('document:keydown', ['$event'])
    private handleKeyboardEvent(event: KeyboardEvent) {
        if (this.createGameViewVisible && event.keyCode === GamesRouteComponent.ESCAPE_KEYCODE) {
            this.hideCreateGameView();
        }
    }

    private getGames(): Bluebird<Array<Game>> {
        return this.gamesService.getGames();
    }

}
