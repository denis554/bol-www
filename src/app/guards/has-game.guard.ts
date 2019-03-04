import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GameService } from '../modules/bol-core/services/game.service';

@Injectable()
export class HasGameGuard implements CanActivate {

    constructor(private gameService: GameService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.gameService.hasGame();
    }
}
