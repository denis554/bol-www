import { Injectable } from '@angular/core';
import { BolCoreEventsService } from '../modules/bol-core/services/bol-core-events.service';
import { RouterHelperService } from '../services/router-helper.service';

@Injectable()
export class BolCoreEventsToRouterMediatorService {

    constructor(private bolCoreEventsService: BolCoreEventsService,
                private routerHelperService: RouterHelperService) {
    }


    init() {
        this.bolCoreEventsService.onUserLoggedIn(() => {
            this.routerHelperService.goToGames();
        });

        this.bolCoreEventsService.onUserLoggedOut(() => {
            this.routerHelperService.goToAuth();
        });

        this.bolCoreEventsService.onUserJoinedGame(() => {
            this.routerHelperService.goToGame();
        });

        this.bolCoreEventsService.onUserCreatedGame(() => {
            this.routerHelperService.goToGame();
        });
    }
}
