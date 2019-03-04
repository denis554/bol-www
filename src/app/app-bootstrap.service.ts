import { Injectable } from '@angular/core';
import { BolCoreEventsToRouterMediatorService } from './mediators/bol-core-events-to-router-mediator.service';

@Injectable()
export class AppBootstrapService {

    constructor(private bolCoreEventsToRouterMediatorService: BolCoreEventsToRouterMediatorService) {

    }

    init() {
        this.bolCoreEventsToRouterMediatorService.init();
    }

}
