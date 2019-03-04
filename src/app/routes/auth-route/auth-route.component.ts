import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/bol-core/services/auth.service';
import { LoggerFactoryService, Logolous } from '../../modules/bol-core/services/logger-factory.service';
import { BolCoreEventsService } from '../../modules/bol-core/services/bol-core-events.service';
import { User } from '../../modules/bol-core/models/user';

@Component({
    selector: 'bol-auth-route',
    templateUrl: './auth-route.component.html',
    styleUrls: ['./auth-route.component.scss']
})
export class AuthRouteComponent implements OnInit {

    userName: string;
    logInInProgress: boolean;
    userIsLoggedInCheckInProgress: boolean;
    logger: Logolous;
    errorMessage: string;

    constructor(private loggerFactoryService: LoggerFactoryService,
                private authService: AuthService,
                private bolCoreEventsService: BolCoreEventsService) {
        this.logger = loggerFactoryService.make('AuthRouteComponent');
    }

    ngOnInit() {
        this.checkUserIsLoggedIn();
    }

    checkUserIsLoggedIn() {
        this.userIsLoggedInCheckInProgress = true;
        return this.authService.isLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                const loggedInUser = this.authService.getLoggedInUser();
                this.onUserLoggedIn(loggedInUser);
            }
        }).finally(() => {
            this.userIsLoggedInCheckInProgress = false;
        })
    }


    logInUser() {
        if (this.logInInProgress) return;
        this.logInInProgress = true;
        this.authService.logIn(this.userName).then((user) => {
            this.onUserLoggedIn(user);
        }).catch((err) => {
            this.logger.error(`Could not log in "${this.userName}" with error:`, err);
            this.errorMessage = err.error.message;
        }).finally(() => {
            this.logInInProgress = false;
        });
    }

    onUserLoggedIn(user: User) {
        this.logger.info(`${user.getName()} was logged in! Sending to games`);
        this.bolCoreEventsService.emitUserLoggedIn(user);
    }
}
