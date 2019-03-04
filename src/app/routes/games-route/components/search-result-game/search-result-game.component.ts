import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../modules/bol-core/models/game';
import { LoggerFactoryService, Logolous } from '../../../../modules/bol-core/services/logger-factory.service';
import { BolCoreEventsService } from '../../../../modules/bol-core/services/bol-core-events.service';
import { GameService } from '../../../../modules/bol-core/services/game.service';

@Component({
    selector: 'bol-search-result-game',
    templateUrl: './search-result-game.component.html',
    styleUrls: ['./search-result-game.component.scss']
})
export class SearchResultGameComponent implements OnInit {

    @Input()
    game: Game;
    joinGameInProgress: boolean;

    private logger: Logolous;

    constructor(private loggerFactoryService: LoggerFactoryService,
                private bolCoreEventsService: BolCoreEventsService,
                private gameService: GameService) {
        this.logger = loggerFactoryService.make('SearchResultGameComponent');
    }

    ngOnInit() {

    }

    onWantsToJoinGame(game: Game) {
        this.joinGameInProgress = true;
        return this.gameService.joinGame(game).then(() => {
            this.logger.info(`Joined game with name ${game.getName()}! Sending to game route!`);
            this.bolCoreEventsService.emitUserJoinedGame(game);
        }).catch((err) => {
            const errMessage = err.error.message;
            this.logger.error(`User couldn't join game with name ${game.getName()} with message "`, errMessage, '" and error', err);

        }).finally(() => {
            this.joinGameInProgress = false;
        })
    }

}
