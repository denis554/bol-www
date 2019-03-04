import { Injectable } from '@angular/core';
import { NoelEvent } from 'noel/dist/types/event';
import Noel from 'noel';
import { User } from '../models/user';
import { LoggerFactoryService, Logolous } from './logger-factory.service';
import { Game } from '../models/game';

@Injectable()
export class BolCoreEventsService {

    userLoggedInEvent: NoelEvent;
    userJoinedGameEvent: NoelEvent;
    userCreatedGameEvent: NoelEvent;
    userLoggedOutEvent: NoelEvent;
    logger: Logolous;

    constructor(loggerFactory: LoggerFactoryService) {
        const ee = new Noel();
        this.userLoggedInEvent = ee.getEvent('userLoggedIn');
        this.userJoinedGameEvent = ee.getEvent('userJoinedGame');
        this.userCreatedGameEvent = ee.getEvent('userCreatedGame');
        this.userLoggedOutEvent = ee.getEvent('userLoggedOut');
        this.logger = loggerFactory.make('BolCoreEventsService');
    }

    onUserLoggedOut(listener) {
        return this.userLoggedOutEvent.on(listener);
    }

    emitUserLoggedOut(user: User) {
        this.logger.info('Emitting userLoggedOut with user', user);
        return this.userLoggedOutEvent.emit(user);
    }

    onUserLoggedIn(listener) {
        return this.userLoggedInEvent.on(listener);
    }

    emitUserLoggedIn(user: User) {
        this.logger.info('Emitting userLoggedIn with user', user);
        return this.userLoggedInEvent.emit(user);
    }

    onUserJoinedGame(listener) {
        return this.userJoinedGameEvent.on(listener);
    }

    emitUserJoinedGame(game: Game) {
        this.logger.info('Emitting userJoinedGame with user', game);
        return this.userJoinedGameEvent.emit(game);
    }

    onUserCreatedGame(listener) {
        return this.userCreatedGameEvent.on(listener);
    }

    emitUserCreatedGame(game: Game) {
        this.logger.info('Emitting userCreatedGame with user', game);
        return this.userCreatedGameEvent.emit(game);
    }
}
