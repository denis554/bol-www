import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthApiService } from './services/auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { PromisedHttpService } from './services/promised-http.service';
import { LoggerFactoryService } from './services/logger-factory.service';
import { UserFactoryService } from './factories/user-factory.service';
import { GameFactoryService } from './factories/game-factory.service';
import { BolCoreEventsService } from './services/bol-core-events.service';
import { GamesService } from './services/games.service';
import { GamesApiService } from './services/games-api.service';
import { GameService } from './services/game.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: []
})
export class BolCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BolCoreModule,
            providers: [
                UserFactoryService,
                GameFactoryService,
                AuthService,
                PromisedHttpService,
                AuthApiService,
                AuthService,
                LoggerFactoryService,
                BolCoreEventsService,
                GamesApiService,
                GamesService,
                GameService,
            ]
        };
    }
}
